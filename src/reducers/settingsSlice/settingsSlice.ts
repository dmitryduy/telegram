import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISettingsReducerState, typeOfSettings } from "./types";

const initialState = {
    language: 'ru',
    isShowSettings: false,
    backgroundImage: 'default',
    typeSettings: null,
    isNightMode: false
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
        toggleNightMode(state) {
            state.isNightMode = !state.isNightMode;
        }
    }
})

export const {toggleNightMode, setTypeOfSettings, switchSettings, setBackgroundImage} = settingsSlice.actions;

export const {reducer: settingReducer} = settingsSlice;