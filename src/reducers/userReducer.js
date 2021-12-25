import { setDialogsAC } from "./dialogReducer";

const initialState = {
    error: false,
    isAuth: false,
}

const types = {
    FETCH_USER_INFO: 'FETCH_USER_INFO',
    ADD_MESSAGE: 'ADD_MESSAGE'
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_USER_INFO:
            if (action.payload.error) {
                return {...state, error: true};
            }
            return {
                ...action.payload, isAuth: true
            }
        default:
            return {...state};
    }
}

const fetchUserInfoAC = (userInfo) => ({
    type: types.FETCH_USER_INFO,
    payload: userInfo
})


export const fetchUserInfo = (userPhone, nickname) => (dispatch) => {
    fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userPhone, nickname})
    })
        .then(response => {
            if (response.status === 400) {
                return {error: 'Incorrect user nickname'};
            }
            return response.json();
        })
        .then(data => {
            dispatch(fetchUserInfoAC({
                id: data.id,
                phoneNumber: data.phoneNumber,
                nickname: data.nickname,
                avatar: data.avatar,
                error: data.error
            }));
            if (!data.error) {
                dispatch(setDialogsAC(data.dialogs));
            }
        });
}

export default userReducer;