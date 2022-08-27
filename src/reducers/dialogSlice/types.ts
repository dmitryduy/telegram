import { IDialogObject, IGlobalSearch } from "../../types";
import { phone, timestamp, dialogId, IMessage, IDialog } from "../../globalTypes";

export type INewMessage =
    IMessage
    & { dialogId: dialogId, partnerPhone: phone, partnerAvatar: string, partnerNickname: string };

export type IActiveDialog = IDialog & { isOnline: boolean, lastSeen: timestamp | null }


export interface IDialogReducerState {
    dialogs: IDialogObject | {},
    activeDialog: IActiveDialog | null,
    foundedGlobalUsers: IGlobalSearch | null
}