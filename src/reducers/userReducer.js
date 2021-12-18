const initialState = {
    phoneNumber: null
}

const types = {
    FETCH_USER_INFO: 'FETCH_USER_INFO',
    WRITE_MESSAGE: 'WRITE_MESSAGE'
}

const userReducer = (state=initialState, action) => {
    switch (action.type){
        case types.FETCH_USER_INFO:
            return {
                ...action.payload
            }
        case types.WRITE_MESSAGE:
            const newDialogs = state.dialogs.map(dialog => dialog.id === action.payload.dialogId?
                {...dialog, messages: [...dialog.messages, {
                        timestamp: + new Date(),
                        sender: state.id,
                        messageText: action.payload.messageText
                    }]}
            : {...dialog});
            return {...state, dialogs: newDialogs};
        default:
            return {...state};
    }
}

const fetchUserInfoAC = (userInfo) => ({
    type: types.FETCH_USER_INFO,
    payload: userInfo
})

export const writeMessageAC =(messageText, dialogId) => ({
    type: types.WRITE_MESSAGE,
    payload: {
        messageText, dialogId
    }
})

export const fetchUserInfo = (userPhone) => (dispatch) => {
    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userPhone})
    })
        .then(response => response.json())
        .then(data => dispatch(fetchUserInfoAC(data)));
}

export default userReducer;