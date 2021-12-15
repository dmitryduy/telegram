const initialState = {
    language: 'ru',
}

const settingsReducer = (state=initialState, action) => {
    switch (action.type) {
        default:
            return {...state};
    }
}

export default settingsReducer;