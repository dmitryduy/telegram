import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BASE_URL } from '../../types';
import { IGlobalSearchResults, IMessage, IWeakDialog, phone, timestamp } from '../../global.typings';
import { RootState } from '../../store/store';

import { IDialogReducerState } from './types';

const initialState = {
  dialogs: null,
  activeDialog: null,
  globalSearchResults: null,
} as IDialogReducerState;


export const fetchActiveDialog = createAsyncThunk(
  'dialog/fetchActiveDialog',
  async ({partnerPhone}: {partnerPhone: phone}, {getState}) => {
    const state = getState() as RootState;
    const response = await fetch(`${BASE_URL}/dialog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({partnerPhone, initiatorPhone: state.user.phoneNumber})
    });

    return await response.json();
  });

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    initializeDialogs(state, action: PayloadAction<IWeakDialog[]>) {
      state.dialogs = action.payload;
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
    /*addNewMessage(state, action: PayloadAction<INewMessage>) {
      const newMessage = {
        senderPhone: action.payload.senderPhone,
        createDate: action.payload.createDate,
        text: action.payload.text,
        reaction: action.payload.reaction
      };

      if (!state.dialogs || !state.dialogs[action.payload.dialogId]) {
        state.dialogs[action.payload.dialogId] = {
          messages: [newMessage],
          partnerNickname: action.payload.partnerNickname,
          partnerAvatar: action.payload.partnerAvatar,
          partnerPhone: action.payload.partnerPhone,
          unread: 1
        };
        return;
      }

      state.dialogs[action.payload.dialogId].messages.push(newMessage);

      if (state.activeDialog?.id === action.payload.dialogId) {
        state.activeDialog.messages.push(newMessage);
        state.activeDialog.unread = 0;
      } else {
        state.dialogs[action.payload.dialogId].unread++;
      }
    },*/
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
      if (state.activeDialog?.phoneNumber === action.payload.userPhone) {
        state.activeDialog = {...state.activeDialog, lastSeen: action.payload.userLastSeen, isOnline: false};
      }
    },
    sendOnlineUser(state, action: PayloadAction<phone>) {
      if (state.activeDialog && state.activeDialog.phoneNumber === action.payload) {
        state.activeDialog = {...state.activeDialog, lastSeen: null, isOnline: true};
      }
    }

  },
  extraReducers: builder => {
    builder.addCase(fetchActiveDialog.fulfilled, (state, action) => {
      if (action.payload.error) {
        console.error('error');
        return;
      }

      state.activeDialog = action.payload;
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
  sendOnlineUser
} = dialogSlice.actions;

export const {reducer: dialogReducer} = dialogSlice;