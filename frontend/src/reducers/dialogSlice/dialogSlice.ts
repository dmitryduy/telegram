import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BASE_URL } from '../../types';
import { IGlobalSearchResults, IMessage, IWeakDialog, phone, timestamp } from '../../global.typings';
import { RootState } from '../../store/store';

import { IActiveDialog, IDialogReducerState } from './types';

const initialState = {
  dialogs: null,
  activeDialog: null,
  globalSearchResults: null,
  isActiveDialogLoaded: false,
} as IDialogReducerState;


export const fetchActiveDialog = createAsyncThunk(
  'dialog/fetchActiveDialog',
  async ({partnerPhone}: {partnerPhone: phone}, {getState, signal}) => {
    const state = getState() as RootState;
    const response = await fetch(`${BASE_URL}/dialog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal,
      body: JSON.stringify({partnerPhone, initiatorPhone: state.user.phoneNumber})
    });

    return await response.json();
  });

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    initializeDialogs(state, action: PayloadAction<IWeakDialog[] | null>) {
      state.dialogs = action.payload?.sort(
        (a, b) => (b.lastMessageDate || 0) - (a.lastMessageDate || 0)) || null;
    },
    addMessage(state, action: PayloadAction<IMessage>) {
      if (!state.activeDialog) {
        return;
      }
      state.activeDialog.messages.push(action.payload);
      state.activeDialog.unreadMessageCount = null;

      const dialog = state.dialogs?.find(dialog => dialog.phoneNumber === state.activeDialog?.phoneNumber);
      if (dialog) {
        dialog.unreadMessageCount = null;
        dialog.lastMessage = action.payload.text;
        dialog.lastMessageDate = action.payload.createdDate;
      } else {
        state.dialogs = state.dialogs || [];
        const {messages, ...restDialog} = state.activeDialog;

        state.dialogs.push({
          lastMessage: action.payload.text,
          lastMessageDate: action.payload.createdDate,
          ...restDialog
        });
      }
    },
    addNewMessage(state, action: PayloadAction<IWeakDialog>) {
      if (!state.dialogs) {
        state.dialogs = [action.payload];
        return;
      }

      const dialogIndex = state.dialogs.findIndex(dialog => dialog.phoneNumber === action.payload.phoneNumber);

      if (dialogIndex === -1) {
        state.dialogs.unshift(action.payload);
        return;
      }

      state.dialogs.splice(dialogIndex, 1);
      state.dialogs.unshift(action.payload);

      if (state.activeDialog?.phoneNumber === action.payload.phoneNumber) {
        state.activeDialog.messages.push({
          text: action.payload.lastMessage || '',
          createdDate: action.payload.lastMessageDate || 0,
          sender: 'partner'
        });
        state.activeDialog.unreadMessageCount = null;
        state.dialogs[dialogIndex].unreadMessageCount = null;
      }
    },
    setFoundedGlobalUsers(state, action: PayloadAction<IGlobalSearchResults>) {
      state.globalSearchResults = {
        userDialogs: [...action.payload.userDialogs],
        globalDialogs: [...action.payload.globalDialogs]
      };
    },
    removeGlobalUsers(state) {
      state.globalSearchResults = null;
    },
    setOfflineUser(state: IDialogReducerState, action: PayloadAction<{ userPhone: phone, userLastSeen: timestamp }>) {
      if (state.activeDialog?.partnerPhone === action.payload.userPhone) {
        state.activeDialog = {...(state.activeDialog as IActiveDialog),
          lastSeen: action.payload.userLastSeen,
          isOnline: false
        };
      }
    },
    sendOnlineUser(state, action: PayloadAction<phone>) {
      if (state.activeDialog && state.activeDialog.phoneNumber === action.payload) {
        state.activeDialog = {...state.activeDialog, lastSeen: null, isOnline: true};
      }
    },
    clearActiveDialog(state) {
      state.activeDialog = null;
    }

  },
  extraReducers: builder => {
    builder.addCase(fetchActiveDialog.fulfilled, (state, action) => {
      state.isActiveDialogLoaded = false;
      if (action.payload.error) {
        return;
      }

      const dialog = state.dialogs?.find(dialog => dialog.phoneNumber === action.meta.arg.partnerPhone);
      if (dialog) {
        dialog.unreadMessageCount = null;
      }
      state.activeDialog = action.payload;
    });
    builder.addCase(fetchActiveDialog.pending, (state, action) => {
      state.isActiveDialogLoaded = true;
      if (!state.activeDialog) {
        state.activeDialog = {} as IActiveDialog;
      }
      state.activeDialog.phoneNumber = action.meta.arg.partnerPhone;
    });
  },
}
);

export const {
  removeGlobalUsers,
  addMessage,
  setFoundedGlobalUsers,
  initializeDialogs,
  setOfflineUser,
  sendOnlineUser,
  addNewMessage,
  clearActiveDialog
} = dialogSlice.actions;

export const {reducer: dialogReducer} = dialogSlice;