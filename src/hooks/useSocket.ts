import socket from "../socket";

const useSocket = (msgName: string) => {

    return {
        on: (cb) => {
            socket.on(msgName, (data) => {
                cb(data);
            })
        },
        off: () => {
            socket.off(msgName)
        },
        emit: (data: any) => {
            socket.emit(msgName, data)
        }
    }
}

export default useSocket;