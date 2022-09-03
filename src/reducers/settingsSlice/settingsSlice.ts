import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { sendHotkey, themeColor } from '../../global.typings';

import { ISettingsReducerState } from './types';

const initialState = {
  language: 'ru',
  isShowSettings: false,
  backgroundImage: JSON.parse(localStorage.getItem('background-image') || '"default"'),
  isNightMode: false,
  themeColor: JSON.parse(localStorage.getItem('theme-color') || '"#40a7e3"'),
  sendHotkey: JSON.parse(localStorage.getItem('send-hotkey') || '"enter"')
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
    setHotkeyBySend(state, action: PayloadAction<sendHotkey>) {
      state.sendHotkey = action.payload;
    }
  }
});

export const {
  toggleNightMode,
  switchSettings,
  setBackgroundImage,
  setThemeColor,
  setHotkeyBySend
} = settingsSlice.actions;

export const {reducer: settingReducer} = settingsSlice;