const initialState = {
    phoneNumber: null
}

const types = {
    FETCH_USER_INFO: 'FETCH_USER_INFO'
}

const userReducer = (state=initialState, action) => {
    switch (action.type){
        case types.FETCH_USER_INFO:
            return {
                ...action.payload
            }
        default:
            return {...state};
    }
}

const fetchUserInfoAC = (userInfo) => ({
    type: types.FETCH_USER_INFO,
    payload: userInfo
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