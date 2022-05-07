
export const Base_Url = 'https://telegram-server-part.herokuapp.com';

export type timestamp = number;
export type dialogId = number;
export type phone = string;

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

export interface IUser {
    phoneNumber: phone,
    dialogs: Map<dialogId, IDialog> | null,
    isOnline: boolean,
    socketId: string | null,
    nickname: string,
    lastSeen: timestamp | null,
    avatar: string,
    backgroundImage: string
}



export interface IGlobalSearch {
    chatsOfUser: dialogId[],
    chatsOfGlobal: IDialog[]
}