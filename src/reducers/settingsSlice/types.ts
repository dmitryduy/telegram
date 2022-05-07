export type typeOfSettings = 'background' | 'mode';

export interface ISettingsReducerState {
    language: 'ru' | 'en';
    isShowSettings: boolean,
    backgroundImage: string,
    typeSettings: typeOfSettings | null,
    mode: 'night' | 'day'
}