import { sendHotkey, themeColor } from "../globalTypes";

export type localStorageKeys = 'night-mode' | 'theme-color' | 'background-image' | 'send-hotkey';

interface ILocalStorage {
    'night-mode': boolean,
    'theme-color': themeColor,
    'background-image': string,
    'send-hotkey': sendHotkey
}

const testData = {
    'night-mode': true,
    'theme-color': "#52b440",
    'background-image': '',
    'send-hotkey': 'enter'
} as ILocalStorage;


export class LocalStorage {
    get<T>(key: localStorageKeys): T | undefined {
        const item = localStorage.getItem(key);
        if (!item) return;

        return JSON.parse(item);
    }

    set<T>(key: localStorageKeys, value: T){
        if (typeof value !== typeof testData[key]) {
            window.emitter.emit<{value: string}>('tooltip:show', {value: 'Invalid value of localStorage'});
            return;
        }
        localStorage.setItem(key, JSON.stringify(value));
    }
}