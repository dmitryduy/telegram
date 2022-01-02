import { dialogId, IDialog, IMessage, phone, timestamp } from "../../../backend/types";

export type INewMessage =
    IMessage
    & { dialogId: dialogId, partnerPhone: phone, partnerAvatar: string, partnerNickname: string };

export type IActiveDialog = IDialog & { dialogId: dialogId, isOnline: boolean, lastSeen: timestamp | null }

export enum dialogActionType {
    SET_ACTIVE_DIALOG = 'SET_ACTIVE_DIALOG',
    SET_DIALOGS = 'SET_DIALOGS',
    ADD_MESSAGE = 'ADD_MESSAGE',
    ADD_NEW_MESSAGE = 'ADD_NEW_MESSAGE',
    SET_FOUNDED_GLOBAL_USERS = 'SET_FOUNDED_GLOBAL_USERS',
    REMOVE_SEARCH_RESULTS = 'REMOVE_SEARCH_RESULTS',
    SET_OFFLINE_USER = 'SET_OFFLINE_USER',
    SET_ONLINE_USER = 'SET_ONLINE_USER'
}

export interface IInitializeDialogsAC {
    type: dialogActionType.SET_DIALOGS,
    payload: Map<dialogId, IDialog> | null
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

export interface ISetActiveDialogAC {
    type: dialogActionType.SET_ACTIVE_DIALOG,
    payload: IActiveDialog
}

export interface IAddMessageAC {
    type: dialogActionType.ADD_MESSAGE,
    payload: IMessage
}

export interface ISetFoundedGlobalUsers {
    type: dialogActionType.SET_FOUNDED_GLOBAL_USERS,
    payload: IDialog[]
}

export type DialogReducerAction =
    IInitializeDialogsAC
    | IRemoveGlobalUsersAC
    | ISetOfflineUserAC
    | ISetOnlineUserAC
    | IAddNewMessageAC
    | ISetActiveDialogAC
    | IAddMessageAC
    | ISetFoundedGlobalUsers;

export interface IDialogReducerState {
    dialogs: Map<dialogId, IDialog> | null,
    activeDialog: IActiveDialog | null,
    foundedGlobalUsers: IDialog[] | null
}