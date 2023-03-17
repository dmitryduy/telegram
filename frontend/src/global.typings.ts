import { FormEvent } from 'react';

export type timestamp = number;
export type phone = string;
export type url = string;

export type inputEvent = string | FormEvent<EventTarget>;

export type sendHotkey = 'enter' | 'ctrl-enter';

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

export type avatarImageUrl = string;

export type avatarImage = themeColor | avatarImageUrl;

export type reaction = 'like' | 'dislike' | 'heart' | 'fire' | 'poop' | null;


export interface IMessage {
  createdDate: timestamp,
  text: string,
  sender: 'user' | 'partner'
}

export interface IWeakDialog {
  partnerPhone: phone;
  partnerAvatar: string;
  partnerAvatarContent: string;
  partnerFullName: string;
  unreadMessageCount: number | null;
  lastMessage: string | null;
  lastMessageDate: timestamp | null;
}


export interface IDialog extends Omit<IWeakDialog, 'lastMessageDate' | 'lastMessage'> {
  messages: IMessage[];
}

export interface IUser {
  phoneNumber: phone,
  dialogs: IWeakDialog[] | null,
  isOnline: boolean,
  socketId: string | null,
  nickname: string,
  lastSeen: timestamp | null,
  avatar: themeColor | url,
  backgroundImage: string,
  bio: string | null,
  name: string | null,
  surname: string | null,
  settings: Record<string, never>
}

export interface INewMessagePopup {
  text: string,
  partnerAvatar: string,
  partnerNickname: string,
  partnerPhone: phone
}

export interface IGlobalSearchResults {
  userDialogs: IWeakDialog[],
  globalDialogs: Omit<IWeakDialog, 'lastMessageDate' | 'lastMessage'>[]
}