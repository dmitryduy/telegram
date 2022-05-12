import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISettingsReducerState, typeOfSettings } from "./types";
import { themeColor } from "../../globalTypes";

const initialState = {
    language: 'ru',
    isShowSettings: false,
    backgroundImage: 'default',
    typeSettings: null,
    isNightMode: false,
    themeColor: JSON.parse(localStorage.getItem('theme-color') || "#40a7e3")
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
        toggleNightMode(state, action: PayloadAction<boolean | undefined>) {
            if (!action.payload) {
                state.isNightMode = !state.isNightMode;
            } else {
                state.isNightMode = action.payload;
            }
        },
        setThemeColor(state, action: PayloadAction<themeColor>) {
            state.themeColor = action.payload;
        }
    }
})

export const {toggleNightMode, setTypeOfSettings, switchSettings, setBackgroundImage, setThemeColor} = settingsSlice.actions;

export const {reducer: settingReducer} = settingsSlice;