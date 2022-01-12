import {
    IChangeMode,
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
    backgroundImage: 'default',
    typeSettings: null,
    mode: 'day'
}

const settingsReducer = (state = initialState, action: SettingsReducerAction) => {
    switch (action.type) {
        case SettingsActionType.SWITCH_SETTINGS:
            return {...state, isShowSettings: action.payload};
        case SettingsActionType.SET_BACKGROUND_IMAGE:
            return {...state, backgroundImage: action.payload};
        case SettingsActionType.SET_TYPE_OF_SETTINGS:
            return {...state, typeSettings: action.payload, isShowSettings: false}
        case SettingsActionType.CHANGE_MODE:
            return {...state, mode: state.mode === 'day' ? 'night' : 'day'};
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

export const changeModeAC = (): IChangeMode => ({
    type: SettingsActionType.CHANGE_MODE
})
export default settingsReducer;