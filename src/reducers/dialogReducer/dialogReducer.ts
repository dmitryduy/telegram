import {
    dialogActionType,
    DialogReducerAction,
    IAddNewMessageAC,
    IDialogReducerState,
    IInitializeDialogsAC, INewMessage,
    IRemoveGlobalUsersAC,
    ISetOfflineUserAC,
    ISetOnlineUserAC
} from "./types";
import { dialogId, IDialog, phone, timestamp } from "../../../backend/types";

const initialState: IDialogReducerState = {
    dialogs: null,
    activeDialog: null,
    foundedGlobalUsers: null,
}


const dialogReducer = (state = initialState, action: DialogReducerAction): IDialogReducerState => {
    switch (action.type) {
        case dialogActionType.REMOVE_SEARCH_RESULTS:
            return {...state, foundedGlobalUsers: null};
        case types.SET_DIALOG:
            if (!action.payload.messages.length) {
                const foundUser = state.searchResults.find(foundedUser => foundedUser.nickname === action.payload.with);
                return {
                    ...state,
                    activeDialog: {
                        ...action.payload,
                        withOnline: foundUser.online,
                        withLastSeen: foundUser.lastSeen,
                        withPhoneNumber: foundUser.phoneNumber,
                        withAvatar: foundUser.withAvatar
                    }
                }
            }
            return {...state, activeDialog: {...action.payload}}
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
        case types.ADD_MESSAGE:
            const isHaveDialog = state.dialogs.find(dialog => dialog.id === state.activeDialog.id);
            if (!isHaveDialog) {
                return {
                    ...state, activeDialog: {...state.activeDialog, messages: [action.payload]},
                    dialogs: [{
                        id: state.activeDialog.id,
                        with: state.activeDialog.with,
                        withOnline: state.activeDialog.withOnline,
                        withAvatar: state.activeDialog.withAvatar,
                        withPhoneNumber: state.activeDialog.withPhoneNumber,
                        withLastSeen: state.activeDialog.withLastSeen,
                        messages: [action.payload]
                    }, ...state.dialogs]
                }
            }
            const newDialogs = state.dialogs.filter(dialog => dialog.id !== state.activeDialog.id);
            return {
                activeDialog: {...state.activeDialog, messages: [...state.activeDialog.messages, action.payload]},
                dialogs: [{
                    ...state.activeDialog,
                    messages: [...state.activeDialog.messages, action.payload]
                }, ...newDialogs,]
            }
        case types.SET_SEARCH_RESULTS:
            return {...state, searchResults: [...action.payload]}
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
                    partnerPhone: action.payload.partnerPhone
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
                activeDialogWithMessage.messages.push(newMessage);
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

export const setDialogAC = (dialog) => ({
    type: types.SET_DIALOG,
    payload: dialog
})

export const initializeDialogsAC = (dialogs: Map<dialogId, IDialog>): IInitializeDialogsAC => ({
    type: dialogActionType.SET_DIALOGS,
    payload: dialogs
})

export const addMessageAC = (messageObj) => ({
    type: types.ADD_MESSAGE,
    payload: messageObj
})

export const addNewMessageAC = (message: INewMessage): IAddNewMessageAC => ({
    type: dialogActionType.ADD_NEW_MESSAGE,
    payload: message
})

export const setSearchResultsAC = (data) => ({
    type: types.SET_SEARCH_RESULTS,
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

export default dialogReducer;