export type timestamp = number;
export type dialogId = string;
export type phone = string;

export interface IMessage {
    createDate: timestamp,
    text: string,
    senderPhone: phone
}

export interface IDialog {
    id: number
    partnerPhone: phone,
    partnerAvatar: string,
    partnerNickname: string,
    unread: number
    messages: IMessage[];
}

export interface IUser {
    phoneNumber: phone,
    dialogs: IDialog[] | null,
    isOnline: boolean,
    socketId: string | null,
    nickname: string,
    lastSeen: timestamp | null,
    avatar: string,
    backgroundImage: string,
    bio: string | null,
    name: string | null,
    surname: string | null
}

export interface INewMessagePopup {
    text: string,
    partnerAvatar: string,
    partnerNickname: string,
    partnerPhone: phone
}