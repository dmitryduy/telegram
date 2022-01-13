import {
    dialogActionType,
    DialogReducerAction,
    IActiveDialog,
    IAddMessageAC,
    IAddNewMessageAC,
    IDialogReducerState,
    IInitializeDialogsAC,
    INewMessage,
    IRemoveGlobalUsersAC,
    ISetActiveDialogAC,
    ISetFoundedGlobalUsers,
    ISetOfflineUserAC,
    ISetOnlineUserAC
} from "./types";
import { dialogId, IDialog, IGlobalSearch, IMessage, phone, timestamp } from "../../types";
import { Dispatch } from "react";

const initialState: IDialogReducerState = {
    dialogs: null,
    activeDialog: null,
    foundedGlobalUsers: null,
}


const dialogReducer = (state = initialState, action: DialogReducerAction): IDialogReducerState => {
    switch (action.type) {
        case dialogActionType.REMOVE_SEARCH_RESULTS:
            return {...state, foundedGlobalUsers: null};
        case dialogActionType.SET_ACTIVE_DIALOG:
            const dialogsWithoutUnread: Map<dialogId, IDialog> | null = new Map(JSON.parse(JSON.stringify(state.dialogs?[...state.dialogs?.entries()]: [])));
            if (action.payload.unread) {
                dialogsWithoutUnread!.set(action.payload.dialogId, {
                    ...dialogsWithoutUnread!.get(action.payload.dialogId)!,
                    unread: 0
                });
            }
            return {...state, dialogs: dialogsWithoutUnread, activeDialog: JSON.parse(JSON.stringify(action.payload))};
        case dialogActionType.SET_DIALOGS:
            return {...state, dialogs: action.payload};
        case dialogActionType.SET_ONLINE_USER:
            if (state.activeDialog && state.activeDialog.partnerPhone === action.payload) {
                return {
                    ...state,
                    activeDialog: {...state.activeDialog, lastSeen: null, isOnline: true}
                };
            }
            return {...state};
        case dialogActionType.SET_OFFLINE_USER:
            if (state.activeDialog && state.activeDialog.partnerPhone === action.payload.userPhone) {
                return {
                    ...state,
                    activeDialog: {...state.activeDialog, lastSeen: action.payload.userLastSeen, isOnline: false}
                };
            }
            return {...state};
        case dialogActionType.ADD_MESSAGE:
            const isHaveDialog = state.dialogs?.get(state.activeDialog!.dialogId);
            if (!isHaveDialog) {
                const copyOfDialogs = new Map(state.dialogs ? [...state.dialogs] : []);
                copyOfDialogs.set(state.activeDialog!.dialogId, {
                    messages: [action.payload],
                    partnerNickname: state.activeDialog!.partnerNickname,
                    partnerAvatar: state.activeDialog!.partnerAvatar,
                    partnerPhone: state.activeDialog!.partnerPhone,
                    unread: state.activeDialog!.unread
                });
                return {
                    ...state, activeDialog: {...state.activeDialog!, unread: 0, messages: [action.payload]},
                    dialogs: copyOfDialogs
                };
            }
            const copyOfDialogs = new Map([...state.dialogs!]);
            copyOfDialogs.get(state.activeDialog!.dialogId)!.messages.push(action.payload)
            return {
                ...state,
                activeDialog: {...state.activeDialog!, unread: 0, messages: [...state.activeDialog!.messages, action.payload]},
                dialogs: copyOfDialogs
            }
        case dialogActionType.SET_FOUNDED_GLOBAL_USERS:
            return {
                ...state,
                foundedGlobalUsers: {
                    chatsOfGlobal: [...action.payload.chatsOfGlobal],
                    chatsOfUser: [...action.payload.chatsOfUser]
                }
            };
        case dialogActionType.ADD_NEW_MESSAGE:
            const newMessage = {
                senderPhone: action.payload.senderPhone,
                createDate: action.payload.createDate,
                text: action.payload.text
            }
            if (!state.dialogs || !state.dialogs.has(action.payload.dialogId)) {
                const newDialog: IDialog = {
                    messages: [newMessage],
                    partnerNickname: action.payload.partnerNickname,
                    partnerAvatar: action.payload.partnerAvatar,
                    partnerPhone: action.payload.partnerPhone,
                    unread: 1
                };
                return {
                    ...state,
                    dialogs: new Map(state.dialogs ? [...state.dialogs] : []).set(action.payload.dialogId, newDialog)
                }
            }

            const dialogsWithNewMessage = new Map([...state.dialogs]);
            dialogsWithNewMessage.get(action.payload.dialogId)!.messages.push(newMessage);
            const activeDialogWithMessage = state.activeDialog;
            if (activeDialogWithMessage?.dialogId === action.payload.dialogId) {
                activeDialogWithMessage.messages = [...activeDialogWithMessage.messages, newMessage];
                activeDialogWithMessage.unread = 0;
            }
            if (state.activeDialog?.dialogId !== action.payload.dialogId) {
                dialogsWithNewMessage.get(action.payload.dialogId)!.unread++;
            }
            return {
                ...state,
                dialogs: dialogsWithNewMessage,
                activeDialog: activeDialogWithMessage
            }

        default:
            return {...state}
    }
}


export const initializeDialogsAC = (dialogs: Map<dialogId, IDialog> | null): IInitializeDialogsAC => ({
    type: dialogActionType.SET_DIALOGS,
    payload: dialogs
})

export const addMessageAC = (message: IMessage): IAddMessageAC => ({
    type: dialogActionType.ADD_MESSAGE,
    payload: message
})

export const addNewMessageAC = (message: INewMessage): IAddNewMessageAC => ({
    type: dialogActionType.ADD_NEW_MESSAGE,
    payload: message
})

export const setFoundedGlobalUsers = (data: IGlobalSearch): ISetFoundedGlobalUsers => ({
    type: dialogActionType.SET_FOUNDED_GLOBAL_USERS,
    payload: data
})

export const removeGlobalUsersAC = (): IRemoveGlobalUsersAC => ({
    type: dialogActionType.REMOVE_SEARCH_RESULTS
})

export const setOfflineUserAC = (userPhone: phone, userLastSeen: timestamp): ISetOfflineUserAC => ({
    type: dialogActionType.SET_OFFLINE_USER,
    payload: {
        userPhone,
        userLastSeen
    }
})

export const sendOnlineUserAC = (userPhone: phone): ISetOnlineUserAC => ({
    type: dialogActionType.SET_ONLINE_USER,
    payload: userPhone
})

export const setActiveDialog = (dialog: IActiveDialog): ISetActiveDialogAC => ({
    type: dialogActionType.SET_ACTIVE_DIALOG,
    payload: dialog
})

export const fetchActiveDialog = (dialog: IDialog & { dialogId: dialogId | null }, userPhone: phone) => async (dispatch: Dispatch<DialogReducerAction>) => {
    const response = await fetch(`https://telegram-server-part.herokuapp.com/users/phone?partnerPhone=${dialog.partnerPhone}&userPhone=${userPhone}`);
    const data: { isOnline: boolean, lastSeen: timestamp | null } = await response.json();
    dispatch(setActiveDialog({
        ...dialog,
        dialogId: dialog.dialogId || Date.now(),
        isOnline: data.isOnline,
        lastSeen: data.lastSeen
    }));
}

export default dialogReducer;