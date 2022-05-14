export type timestamp = number;
export type dialogId = string;
export type phone = string;
export type url = string;

export type themeColor =
    '#40a7e3'
    | '#45bce7'
    | '#52b440'
    | '#d46c99'
    | '#df8a49'
    | '#9978c8'
    | '#c55245'
    | '#687b98'
    | '#dea922';

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

export interface IUserSettings {
}

export interface IUser {
    phoneNumber: phone,
    dialogs: IDialog[] | null,
    isOnline: boolean,
    socketId: string | null,
    nickname: string,
    lastSeen: timestamp | null,
    avatar: themeColor | url,
    backgroundImage: string,
    bio: string | null,
    name: string | null,
    surname: string | null,
    settings: IUserSettings
}

export interface INewMessagePopup {
    text: string,
    partnerAvatar: string,
    partnerNickname: string,
    partnerPhone: phone
}