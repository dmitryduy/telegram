import { timestamp } from "../../../backend/types";

export enum SettingsActionType {
    SWITCH_SETTINGS = 'SWITCH_SETTINGS'
}

export interface ISwitchSettingsAC {
    type: SettingsActionType.SWITCH_SETTINGS,
    payload: boolean
}


export type SettingsReducerAction = ISwitchSettingsAC;

export interface ISettingsReducerState {
    language: 'ru' | 'en';
    isShowSettings: boolean,
    newMessagePopupTime: timestamp
}