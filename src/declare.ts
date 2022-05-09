export {};

declare global {
    interface Window {
        emitter: {
            on: <T extends object>(eventName: string, cb: (data?: T) => void) => void,
            emit: <T extends object>(eventName: string, data?: T) => void,
            un: (eventName: string) => void
        }
    }
}