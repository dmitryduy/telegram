import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IUserReducerState } from "./types";
import { IUser, phone } from "../../globalTypes";

const initialState = {
    isError: false,
    isAuth: false,
    phoneNumber: null,
    nickname: null,
    avatar: null
} as IUserReducerState;

interface IUserFetch {userPhone: phone, nickname: string}

export const fetchUserInfo = createAsyncThunk('user/fetchUserInfo', async ({userPhone, nickname}: IUserFetch): Promise<IUser & { error: null } | {error: string}> => {
    const response = await fetch(`${process.env.REACT_APP_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userPhone, nickname})
    });

    return response.json();
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.fulfilled, (state, action)=> {
            if (action.payload.error) {
                state.isError = true;
                return;
            }
            const {phoneNumber, nickname, avatar} = action.payload as IUser & {error: null};
            state.avatar = avatar;
            state.phoneNumber = phoneNumber;
            state.nickname = nickname;
            state.isAuth = true;
            state.isError = false;
        })
    }
})

export const {reducer: userReducer} = userSlice;