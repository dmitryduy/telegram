
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
    messages: IMessage[];
}

export interface IUser {
    phoneNumber: phone,
    dialogs: Map<dialogId, IDialog> | null,
    isOnline: boolean,
    socketId: string | null,
    nickname: string,
    lastSeen: timestamp | null,
    avatar: string
}

export type IUsers = Map<phone, IUser>;

export interface IGlobalSearch {
    chatsOfUser: dialogId[],
    chatsOfGlobal: IDialog[]
}