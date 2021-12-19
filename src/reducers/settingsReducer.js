const initialState = {
    language: 'ru',
    isShowSettings: false
}

const types ={
    SWITCH_SETTINGS: 'SWITCH_SETTINGS'
}

const settingsReducer = (state=initialState, action) => {
    switch (action.type) {
        case types.SWITCH_SETTINGS:
        return {...state, isShowSettings: action.payload}
        default:
            return {...state};
    }
}

export const switchSettingsAC = (isShow) => ({
    type: types.SWITCH_SETTINGS,
    payload: isShow
})

export default settingsReducer;