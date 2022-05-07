import { dialogId, IDialog, IDialogObject, IGlobalSearch, IMessage, phone, timestamp } from "../../types";

export type INewMessage =
    IMessage
    & { dialogId: dialogId, partnerPhone: phone, partnerAvatar: string, partnerNickname: string };

export type IActiveDialog = IDialog & { dialogId: dialogId, isOnline: boolean, lastSeen: timestamp | null }


export interface IDialogReducerState {
    dialogs: IDialogObject | {},
    activeDialog: IActiveDialog | null,
    foundedGlobalUsers: IGlobalSearch | null
}