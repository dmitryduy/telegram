import { themeColor } from "../../globalTypes";

export type typeOfSettings =
    'background'
    | 'night-mode'
    | 'new-group'
    | 'new-channel'
    | 'contacts'
    | 'calls'
    | 'saved-messages'
    | 'extra-settings'
    | 'edit-profile'
    | 'chat-settings'
    | 'name'
    | 'nickname';

export interface ISettingsReducerState {
    language: 'ru' | 'en';
    isShowSettings: boolean,
    backgroundImage: string,
    typeSettings: typeOfSettings | null,
    isNightMode: boolean,
    themeColor: themeColor
}