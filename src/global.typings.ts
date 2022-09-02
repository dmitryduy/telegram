import { FormEvent } from 'react';

export type timestamp = number;
export type dialogId = number;
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
  createDate: timestamp,
  text: string,
  senderPhone: phone,
  reaction: reaction
}

export interface IDialog {
  id: number// as partnerPhone
  partnerPhone: phone,
  partnerAvatar: string,
  partnerNickname: string,
  partnerName: string | null,
  partnerSurname: string | null,
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

export interface IWeakDialog {
  id: number
  avatar: string
  avatarText: string
  nickname: string
  unread: number | null
  lastMessage: string | null
  lastMessageDate: timestamp | null
}

export interface IGlobalSearchResults {
  userDialogs: IWeakDialog[],
  globalDialogs: IWeakDialog[]
}