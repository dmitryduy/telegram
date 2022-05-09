export {};

declare global {
    interface Window {
        emitter: {
            on: (eventName: string, cb: () => void) => void,
            emit: (eventName: string) => void,
            un: (eventName: string) => void
        }
    }
}