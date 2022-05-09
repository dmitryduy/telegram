export type typeOfSettings = 'background' | 'night-mode' | 'new-group' | 'new-channel' | 'contacts' | 'calls' | 'saved-messages' | 'settings' | 'edit-profile';

export interface ISettingsReducerState {
    language: 'ru' | 'en';
    isShowSettings: boolean,
    backgroundImage: string,
    typeSettings: typeOfSettings | null,
    isNightMode: boolean
}