import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { BASE_URL } from '../../types';
import { IGlobalSearchResults, IWeakDialog, phone, reaction, timestamp } from '../../global.typings';

import { IActiveDialog, IDialogReducerState } from './types';

const initialState = {
  dialogs: null,
  activeDialog: null,
  globalSearchResults: null,
} as IDialogReducerState;

interface IFetchActiveDialog {
  partnerPhone: phone | null,
  userPhone: phone | null
}

export const fetchActiveDialog = createAsyncThunk(
  'dialog/fetchActiveDialog',
  async ({partnerPhone, userPhone}: IFetchActiveDialog) => {
    const response = await fetch(`${BASE_URL}/users/phone?partnerPhone=${partnerPhone}&userPhone=${userPhone}`);
    return await response.json();
  });

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    initializeDialogs(state, action: PayloadAction<IWeakDialog[]>) {
      state.dialogs = action.payload;
    },
    /*  addMessage(state, action: PayloadAction<IMessage>) {
      if (!state.activeDialog) return;

      const isNewDialog = !state.dialogs[state.activeDialog.id];

      if (isNewDialog) {
        state.dialogs[state.activeDialog.id] = {
          messages: [action.payload],
          partnerNickname: state.activeDialog.partnerNickname,
          partnerAvatar: state.activeDialog.partnerAvatar,
          partnerPhone: state.activeDialog.partnerPhone,
          unread: state.activeDialog.unread
        };
        state.activeDialog.messages.push(action.payload);
        return;
      }

      state.dialogs[state.activeDialog.id].messages.push(action.payload);

      state.activeDialog.unread = 0;
      state.activeDialog.messages.push(action.payload);
    },
    addNewMessage(state, action: PayloadAction<INewMessage>) {
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
    setActiveDialog(state, action: PayloadAction<IActiveDialog>) {
      state.activeDialog = action.payload;
    },
    removeGlobalUsers(state) {
      state.globalSearchResults = null;
    },
    setOfflineUser(state: IDialogReducerState, action: PayloadAction<{ userPhone: phone, userLastSeen: timestamp }>) {
      if (state.activeDialog?.partnerPhone === action.payload.userPhone) {
        state.activeDialog = {...state.activeDialog, lastSeen: action.payload.userLastSeen, isOnline: false};
      }
    },
    sendOnlineUser(state, action: PayloadAction<phone>) {
      if (state.activeDialog && state.activeDialog.partnerPhone === action.payload) {
        state.activeDialog = {...state.activeDialog, lastSeen: null, isOnline: true};
      }
    },
    deleteReaction(state, action: PayloadAction<number>) {
      const message = state.activeDialog &&
        state.activeDialog.messages.find(message => message.createDate === action.payload);
      if (message) {
        message.reaction = null;
      }
    },
    addReaction(state, action: PayloadAction<{ createDate: number, reaction: reaction }>) {
      const message = state.activeDialog &&
        state.activeDialog.messages.find(message => message.createDate === action.payload.createDate);
      if (message) {
        message.reaction = message.reaction === action.payload.reaction ? null : action.payload.reaction;
      }
    }

  }
});

export const {deleteReaction, addReaction, removeGlobalUsers, setActiveDialog} = dialogSlice.actions;

export const {reducer: dialogReducer, actions: dialogActions} = dialogSlice;