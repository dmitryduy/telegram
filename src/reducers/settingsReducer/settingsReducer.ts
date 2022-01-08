import {
    ISetBackgroundImage,
    ISettingsReducerState,
    ISetTypeOfSettings,
    SettingsActionType,
    SettingsReducerAction,
    typeOfSettings
} from "./types";

const initialState: ISettingsReducerState = {
    language: 'ru',
    isShowSettings: false,
    newMessagePopupTime: 10000,
    backgroundImage: 'default',
    typeSettings: null
}

const settingsReducer = (state=initialState, action: SettingsReducerAction) => {
    switch (action.type) {
        case SettingsActionType.SWITCH_SETTINGS:
        return {...state, isShowSettings: action.payload};
        case SettingsActionType.SET_BACKGROUND_IMAGE:
            return {...state, backgroundImage: action.payload};
        case SettingsActionType.SET_TYPE_OF_SETTINGS:
            return {...state, typeSettings: action.payload, isShowSettings: false }
        default:
            return {...state};
    }
}

export const switchSettingsAC = (isShow: boolean): SettingsReducerAction => ({
    type: SettingsActionType.SWITCH_SETTINGS,
    payload: isShow
})

export const setBackgroundImage = (imageName: string): ISetBackgroundImage => ({
    type: SettingsActionType.SET_BACKGROUND_IMAGE,
    payload: imageName
})

export const setTypeOfSettings = (type: typeOfSettings | null): ISetTypeOfSettings => ({
    type: SettingsActionType.SET_TYPE_OF_SETTINGS,
    payload: type
})

export default settingsReducer;