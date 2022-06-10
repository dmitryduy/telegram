import { IDialogReducerState, INewMessage, } from "./types";
import { IDialogObject, IGlobalSearch } from "../../types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMessage, phone, reaction, timestamp } from "../../globalTypes";

const initialState = {
    dialogs: {},
    activeDialog: null,
    foundedGlobalUsers: null,
} as IDialogReducerState

interface IFetchActiveDialog {
    partnerPhone: string,
    userPhone: phone
}

export const fetchActiveDialog = createAsyncThunk('dialog/fetchActiveDialog', async ({partnerPhone, userPhone}: IFetchActiveDialog) => {
    const response = await fetch(`https://telegram-server-part.herokuapp.com/users/phone?partnerPhone=${partnerPhone}&userPhone=${userPhone}`);
    return await response.json();
});

const dialogSlice = createSlice({
    name: 'dialog',
    initialState,
    reducers: {
        initializeDialogs(state, action: PayloadAction<IDialogObject>) {
            state.dialogs = action.payload;
        },
        addMessage(state, action: PayloadAction<IMessage>) {
            const isNewDialog = state.dialogs[state.activeDialog!.dialogId];
            if (!isNewDialog) {
                state.dialogs[state.activeDialog!.dialogId] = {
                    messages: [action.payload],
                    partnerNickname: state.activeDialog!.partnerNickname,
                    partnerAvatar: state.activeDialog!.partnerAvatar,
                    partnerPhone: state.activeDialog!.partnerPhone,
                    unread: state.activeDialog!.unread
                };
                state.activeDialog = {...state.activeDialog!, unread: 0, messages: [action.payload]};
            }

            state.dialogs[state.activeDialog!.dialogId].messages.push(action.payload);
            state.activeDialog = {
                ...state.activeDialog!,
                unread: 0,
                messages: [...state.activeDialog!.messages, action.payload]
            };
        },
        addNewMessage(state, action: PayloadAction<INewMessage>) {
            const newMessage = {
                senderPhone: action.payload.senderPhone,
                createDate: action.payload.createDate,
                text: action.payload.text,
                reaction: action.payload.reaction
            }

            if (!state.dialogs || !state.dialogs[action.payload.dialogId]) {
                state.dialogs[action.payload.dialogId] = {
                    messages: [newMessage],
                    partnerNickname: action.payload.partnerNickname,
                    partnerAvatar: action.payload.partnerAvatar,
                    partnerPhone: action.payload.partnerPhone,
                    unread: 1
                };
                return;
            }

            state.dialogs[action.payload.dialogId].messages.push(newMessage);

            if (state.activeDialog?.dialogId === action.payload.dialogId) {
                state.activeDialog.messages.push(newMessage);
                state.activeDialog.unread = 0;
            } else {
                state.dialogs[action.payload.dialogId].unread++;
            }
        },
        setFoundedGlobalUsers(state, action: PayloadAction<IGlobalSearch>) {
            state.foundedGlobalUsers = {
                chatsOfGlobal: [...action.payload.chatsOfGlobal],
                chatsOfUser: [...action.payload.chatsOfUser]
            };
        },
        removeGlobalUsers(state) {
            state.foundedGlobalUsers = null;
        },
        setOfflineUser(state: IDialogReducerState, action: PayloadAction<{ userPhone: phone, userLastSeen: timestamp }>) {
            if (state.activeDialog?.partnerPhone === action.payload.userPhone) {
                state.activeDialog = {...state.activeDialog, lastSeen: action.payload.userLastSeen, isOnline: false};
            }
        },
        sendOnlineUser(state, action: PayloadAction<phone>) {
            if (state.activeDialog && state.activeDialog.partnerPhone === action.payload) {
                state.activeDialog = {...state.activeDialog, lastSeen: null, isOnline: true};
            }
        },
        deleteReaction(state, action: PayloadAction<number>) {
            const message = state.activeDialog && state.activeDialog.messages.find(message => message.createDate === action.payload);
            if (message) {
                message.reaction = null
            }
        },
        addReaction(state, action: PayloadAction<{createDate: number, reaction: reaction}>) {
            const message = state.activeDialog && state.activeDialog.messages.find(message => message.createDate === action.payload.createDate);
            if (message) {
                message.reaction = message.reaction === action.payload.reaction ? null: action.payload.reaction
            }
        }

    }
})

export const {deleteReaction, addReaction} = dialogSlice.actions;

export const {reducer: dialogReducer, actions: dialogActions} = dialogSlice;