import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISettingsReducerState, typeOfSettings } from "./types";

const initialState = {
    language: 'ru',
    isShowSettings: false,
    backgroundImage: 'default',
    typeSettings: null,
    mode: 'day'
} as ISettingsReducerState;

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        switchSettings(state, action: PayloadAction<boolean>) {
            state.isShowSettings = action.payload;
        },
        setBackgroundImage(state, action: PayloadAction<string>) {
            state.backgroundImage = action.payload;
        },
        setTypeOfSettings(state, action: PayloadAction<typeOfSettings | null>) {
            state.typeSettings = action.payload;
            state.isShowSettings = false;
        },
        changeMode(state) {
            state.mode = state.mode === 'day' ? 'night': 'day';
        }
    }
})

export const {reducer: settingReducer, actions: settingsActions} = settingsSlice;