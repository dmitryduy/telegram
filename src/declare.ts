import { localStorageKeys } from "@helpers/localStorage";

export {};

declare global {
    interface Window {
        emitter: {
            on: <T extends object>(eventName: string, cb: (data?: T) => void) => void,
            emit: <T extends object>(eventName: string, data?: T) => void,
            un: (eventName: string) => void
        },
        storage: {
            get: <T>(key: localStorageKeys) => T | undefined,
            set: <T>(key: localStorageKeys, value: T) => void
        }
    }
}