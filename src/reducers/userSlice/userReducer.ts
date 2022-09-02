import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IUser, phone } from '../../global.typings';
import { RootState } from '../../store/store';

import { IUserReducerState } from './types';

const initialState = {
  backendError: null,
  isAuth: false,
  phoneNumber: null,
  nickname: null,
  avatar: null,
  bio: null,
  name: null,
  surname: null
} as IUserReducerState;

interface IUserFetch {
    userPhone: phone,
    nickname: string
}

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async ({
  userPhone,
  nickname
}: IUserFetch): Promise<IUser & { error: null } | { error: string }> => {
  const response = await fetch(`${process.env.REACT_APP_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({userPhone, nickname})
  });

  return response.json();
});

export const updateBio = createAsyncThunk('user/updateBio', async (_, {getState, rejectWithValue}) => {
  const state = getState() as RootState;
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/bio`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({bio: state.user.bio, nickname: state.user.nickname})
    });
    if (!response.ok) {
      return rejectWithValue('Cannot update bio.');
    }
    return response.ok;
  } catch (e) {
    return rejectWithValue('Cannot update bio.');
  }

});

export const updateName = createAsyncThunk(
  'user/updateName',
  async ({name, surname}: { name: string, surname: string }, {rejectWithValue, getState}) => {
    const state = getState() as RootState;
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/name`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, surname, nickname: state.user.nickname})
      });
      if (!response.ok) {
        return rejectWithValue('Cannot update name.');
      }
      return response.ok;
    } catch (e) {
      return rejectWithValue('Cannot update name.');
    }
  });

export const updateNickname = createAsyncThunk(
  'user/updateNickname',
  async ({nickname}: { nickname: string }, {rejectWithValue, getState}) => {
    const state = getState() as RootState;
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/is-available-nickname`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nickname, prevNickname: state.user.nickname})
      });
      if (!response.ok) {
        return rejectWithValue('Cannot update nickname.');
      }
      return response.ok;
    } catch (e) {
      return rejectWithValue('Cannot update nickname.');
    }
  });



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setBio(state, action: PayloadAction<string>) {
      state.bio = action.payload;
    },
    setName(state, action: PayloadAction<{ name: string, surname: string }>) {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
    },
    setNickname(state, action: PayloadAction<string>) {
      state.nickname = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      if (action.payload.error) {
        state.backendError = action.payload.error;
        return;
      }
      const {phoneNumber, nickname, avatar, bio, name, surname} = action.payload as IUser;
      state.avatar = avatar;
      state.phoneNumber = phoneNumber;
      state.nickname = nickname;
      state.bio = bio;
      state.name = name;
      state.surname = surname;
      state.isAuth = true;
    });
  }
});

export const {setBio, setName, setNickname} = userSlice.actions;

export const {reducer: userReducer} = userSlice;