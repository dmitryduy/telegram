const initialState = {
    dialogs: [],
    activeDialog: null
}

const types = {
    SET_DIALOG: 'SET_DIALOG',
    SET_DIALOGS: 'SET_DIALOGS',
    ADD_MESSAGE: 'ADD_MESSAGE',
    ADD_RECEIVE_MESSAGE: 'ADD_RECEIVE_MESSAGE'
}

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_DIALOG:
            return {...state, activeDialog: {...action.payload}}
        case types.SET_DIALOGS:
            return {...state, dialogs: [...action.payload]}
        case types.ADD_MESSAGE:
            const newDialogs = state.dialogs.filter(dialog => dialog.id !== state.activeDialog.id);
            return {
                activeDialog: {...state.activeDialog, messages: [...state.activeDialog.messages, action.payload]},
                dialogs: [...newDialogs, {
                    ...state.activeDialog,
                    messages: [...state.activeDialog.messages, action.payload]
                }]
            }
        case types.ADD_RECEIVE_MESSAGE:
            const newMessage = {
                timestamp: action.payload.timestamp,
                sender: action.payload.sender,
                messageText: action.payload.messageText
            }
            const temp = state.dialogs.map(dialog => {
                if (dialog.id === action.payload.dialogId) {
                    return {...dialog, messages: [...dialog.messages, newMessage]}
                }
                return {...dialog};
            });
            if (!state.activeDialog) {
                return {...state, dialogs: temp};
            }

            return {
                ...state,
                dialogs: temp,
                activeDialog: state.activeDialog.id === action.payload.dialogId ? {
                    ...state.activeDialog,
                    messages: [...state.activeDialog.messages, newMessage]
                } : {...this.state.activeDialog}
            }
        default:
            return {...state}
    }
}

export const setDialogAC = (dialog) => ({
    type: types.SET_DIALOG,
    payload: dialog
})

export const setDialogsAC = (dialogs) => ({
    type: types.SET_DIALOGS,
    payload: dialogs
})

export const addMessageAC = (messageObj) => ({
    type: types.ADD_MESSAGE,
    payload: messageObj
})

export const addReceiveMessageAC = (messageText, dialogId, timestamp, sender) => ({
    type: types.ADD_RECEIVE_MESSAGE,
    payload: {messageText, dialogId, timestamp, sender}
})

export default dialogReducer;