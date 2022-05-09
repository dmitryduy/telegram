
export class Emitter {
    listeners = {}
    on(eventName: string, cb: () => void) {
        if (!this.listeners[eventName]) {
            this.listeners[eventName] = [];
        }
        this.listeners[eventName].push(cb);
    }
    emit(eventName: string) {
        if (this.listeners[eventName]) {
            for (let cb of this.listeners[eventName]) {
                cb();
            }
        }
    }
    un(eventName: string) {
        delete this.listeners[eventName];
    }
}
