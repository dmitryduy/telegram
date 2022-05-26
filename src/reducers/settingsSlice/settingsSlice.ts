import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ISettingsReducerState } from "./types";
import { themeColor } from "../../globalTypes";

const initialState = {
    language: 'ru',
    isShowSettings: false,
    backgroundImage: JSON.parse(localStorage.getItem('background-image') || "\"default\""),
    isNightMode: false,
    themeColor: JSON.parse(localStorage.getItem('theme-color') || "\"#40a7e3\""),
    sendMessageBy: JSON.parse(localStorage.getItem('send-key') || "\"enter\"")
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
        toggleNightMode(state, action: PayloadAction<boolean | undefined>) {
            if (action.payload === undefined) {
                state.isNightMode = !state.isNightMode;
            } else {
                state.isNightMode = action.payload;
            }
        },
        setThemeColor(state, action: PayloadAction<themeColor>) {
            state.themeColor = action.payload;
        },
        setSendMessageType(state, action: PayloadAction<typeof initialState.sendMessageBy>) {
            state.sendMessageBy = action.payload;
        }
    }
})

export const {toggleNightMode, switchSettings, setBackgroundImage, setThemeColor, setSendMessageType} = settingsSlice.actions;

export const {reducer: settingReducer} = settingsSlice;