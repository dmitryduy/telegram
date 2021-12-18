const initialState = {
    dialogs: [],
    activeDialog: null,
    searchResults: null,
}

const types = {
    SET_DIALOG: 'SET_DIALOG',
    SET_DIALOGS: 'SET_DIALOGS',
    ADD_MESSAGE: 'ADD_MESSAGE',
    ADD_RECEIVE_MESSAGE: 'ADD_RECEIVE_MESSAGE',
    SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
    REMOVE_SEARCH_RESULTS: 'REMOVE_SEARCH_RESULTS'
}

const dialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REMOVE_SEARCH_RESULTS:
            return {...state, searchResults: null}
        case types.SET_DIALOG:
            return {...state, activeDialog: {...action.payload}}
        case types.SET_DIALOGS:
            return {...state, dialogs: [...action.payload.sort((a, b) => b.messages[b.messages.length - 1].timestamp - a.messages[a.messages.length - 1].timestamp)]}
        case types.ADD_MESSAGE:
            const isHaveDialog = state.dialogs.find(dialog => dialog.id === state.activeDialog.id);
            if (!isHaveDialog) {
                return {
                    ...state, activeDialog: {...state.activeDialog, messages: [action.payload]},
                    dialogs: [{
                        id: state.activeDialog.id,
                        with: state.activeDialog.with,
                        messages: [action.payload]
                    }, ...state.dialogs]
                }
            }
            const newDialogs = state.dialogs.filter(dialog => dialog.id !== state.activeDialog.id);
            return {
                activeDialog: {...state.activeDialog, messages: [...state.activeDialog.messages, action.payload]},
                dialogs: [{
                    ...state.activeDialog,
                    messages: [...state.activeDialog.messages, action.payload]
                }, ...newDialogs,]
            }
        case types.SET_SEARCH_RESULTS:
            return {...state, searchResults: [...action.payload]}
        case types.ADD_RECEIVE_MESSAGE:
            const newMessage = {
                timestamp: action.payload.timestamp,
                sender: action.payload.sender,
                messageText: action.payload.messageText
            }
            const isHavingDialog = state.dialogs.find(dialog => dialog.id === action.payload.dialogId);
            if (!isHavingDialog) {
                return {
                    ...state,
                    dialogs: [{
                        with: action.payload.senderNickname,
                        id: action.payload.dialogId,
                        messages: [newMessage]
                    },...state.dialogs]
                };
            }

            const temp = state.dialogs.map(dialog => {
                if (dialog.id === action.payload.dialogId) {
                    return {...dialog, messages: [...dialog.messages, newMessage]}
                }
                return {...dialog};
            }).sort((a, b) => b.messages[b.messages.length - 1].timestamp - a.messages[a.messages.length - 1].timestamp);
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

export const addReceiveMessageAC = (messageText, dialogId, timestamp, sender, senderNickname) => ({
    type: types.ADD_RECEIVE_MESSAGE,
    payload: {messageText, dialogId, timestamp, sender, senderNickname}
})

export const setSearchResultsAC = (data) => ({
    type: types.SET_SEARCH_RESULTS,
    payload: data
})

export const removeSearchResultsAC = () => ({
    type: types.REMOVE_SEARCH_RESULTS
})

export default dialogReducer;