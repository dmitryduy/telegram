import { timestamp } from "../../../backend/types";

export type typeOfSettings = 'background';

export enum SettingsActionType {
    SWITCH_SETTINGS = 'SWITCH_SETTINGS',
    SET_BACKGROUND_IMAGE = 'SET_BACKGROUND_IMAGE',
    SET_TYPE_OF_SETTINGS = 'SET_TYPE_OF_SETTINGS'
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


export type SettingsReducerAction = ISwitchSettingsAC | ISetBackgroundImage | ISetTypeOfSettings;

export interface ISettingsReducerState {
    language: 'ru' | 'en';
    isShowSettings: boolean,
    newMessagePopupTime: timestamp,
    backgroundImage: string,
    typeSettings: typeOfSettings | null;
}