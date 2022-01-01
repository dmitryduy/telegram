import { dialogId, IDialog, IMessage, phone, timestamp } from "../../../backend/types";

export type INewMessage =
    IMessage
    & { dialogId: dialogId, partnerPhone: phone, partnerAvatar: string, partnerNickname: string };

export enum dialogActionType {
    SET_DIALOG = 'SET_DIALOG',
    SET_DIALOGS = 'SET_DIALOGS',
    ADD_MESSAGE = 'ADD_MESSAGE',
    ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE',
    SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS',
    REMOVE_SEARCH_RESULTS = 'REMOVE_SEARCH_RESULTS',
    SET_OFFLINE_USER = 'SET_OFFLINE_USER',
    SET_ONLINE_USER = 'SET_ONLINE_USER'
}

export interface IInitializeDialogsAC {
    type: dialogActionType.SET_DIALOGS,
    payload: Map<dialogId, IDialog>
}

export interface IRemoveGlobalUsersAC {
    type: dialogActionType.REMOVE_SEARCH_RESULTS
}

export interface ISetOfflineUserAC {
    type: dialogActionType.SET_OFFLINE_USER,
    payload: {
        userPhone: phone,
        userLastSeen: timestamp
    }
}

export interface ISetOnlineUserAC {
    type: dialogActionType.SET_ONLINE_USER,
    payload: phone
}

export interface IAddNewMessageAC {
    type: dialogActionType.ADD_NEW_MESSAGE,
    payload: INewMessage;
}


export type DialogReducerAction =
    IInitializeDialogsAC
    | IRemoveGlobalUsersAC
    | ISetOfflineUserAC
    | ISetOnlineUserAC
    | IAddNewMessageAC;

export interface IDialogReducerState {
    dialogs: Map<dialogId, IDialog> | null,
    activeDialog: IDialog & { dialogId: dialogId, isOnline: boolean, lastSeen: timestamp | null } | null,
    foundedGlobalUsers: IDialog[] | null
}