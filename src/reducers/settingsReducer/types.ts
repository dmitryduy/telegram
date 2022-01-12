
export type typeOfSettings = 'background' | 'mode';

export enum SettingsActionType {
    SWITCH_SETTINGS = 'SWITCH_SETTINGS',
    SET_BACKGROUND_IMAGE = 'SET_BACKGROUND_IMAGE',
    SET_TYPE_OF_SETTINGS = 'SET_TYPE_OF_SETTINGS',
    CHANGE_MODE = 'CHANGE_MODE'
}

export interface ISwitchSettingsAC {
    type: SettingsActionType.SWITCH_SETTINGS,
    payload: boolean
}

export interface ISetBackgroundImage {
    type: SettingsActionType.SET_BACKGROUND_IMAGE,
    payload: string
}

export interface ISetTypeOfSettings {
    type: SettingsActionType.SET_TYPE_OF_SETTINGS,
    payload: typeOfSettings | null
}

export interface IChangeMode {
    type: SettingsActionType.CHANGE_MODE
}


export type SettingsReducerAction = ISwitchSettingsAC | ISetBackgroundImage | ISetTypeOfSettings | IChangeMode;

export interface ISettingsReducerState {
    language: 'ru' | 'en';
    isShowSettings: boolean,
    backgroundImage: string,
    typeSettings: typeOfSettings | null,
    mode: 'night' | 'day'
}