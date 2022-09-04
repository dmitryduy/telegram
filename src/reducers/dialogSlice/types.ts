import { phone, timestamp, IMessage, IDialog, IGlobalSearchResults, IWeakDialog } from '../../global.typings';

export type INewMessage =
    IMessage
    & { dialogId: number, partnerPhone: phone, partnerAvatar: string, partnerNickname: string };

export type IActiveDialog = IDialog & { isOnline: boolean, lastSeen: timestamp | null }


export interface IDialogReducerState {
    dialogs: IWeakDialog[] | null,
    activeDialog: IActiveDialog | null,
    globalSearchResults: IGlobalSearchResults | null
}