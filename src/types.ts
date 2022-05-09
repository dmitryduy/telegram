import { dialogId, phone, timestamp } from "./globalTypes";

export const Base_Url = process.env.REACT_APP_URL;

export type IDialogObject = { [key: string]: IDialog };

export interface IMessage {
    createDate: timestamp,
    text: string,
    senderPhone: phone
}

export interface IDialog {
    partnerPhone: phone,
    partnerAvatar: string,
    partnerNickname: string,
    unread: number
    messages: IMessage[];
}


export interface IGlobalSearch {
    chatsOfUser: dialogId[],
    chatsOfGlobal: IDialog[]
}