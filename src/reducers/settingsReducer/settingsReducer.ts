import { ISettingsReducerState, SettingsActionType, SettingsReducerAction } from "./types";

const initialState: ISettingsReducerState = {
    language: 'ru',
    isShowSettings: false,
    newMessagePopupTime: 10000
}

const settingsReducer = (state=initialState, action: SettingsReducerAction) => {
    switch (action.type) {
        case SettingsActionType.SWITCH_SETTINGS:
        return {...state, isShowSettings: action.payload};
        default:
            return {...state};
    }
}

export const switchSettingsAC = (isShow: boolean): SettingsReducerAction => ({
    type: SettingsActionType.SWITCH_SETTINGS,
    payload: isShow
})

export default settingsReducer;