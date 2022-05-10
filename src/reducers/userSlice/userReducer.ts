import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { IUserReducerState } from "./types";
import { IUser, phone } from "../../globalTypes";
import { RootState } from "../../store/store";

const initialState = {
    isError: false,
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
            return rejectWithValue('Cannot update bio.')
        }
        return response.ok;
    } catch (e) {
        return rejectWithValue('Cannot update bio.');
    }

});

export const updateName = createAsyncThunk('user/updateName', async ({
                                                                         name,
                                                                         surname
                                                                     }: { name: string, surname: string }, {
                                                                         rejectWithValue,
                                                                         getState
                                                                     }) => {
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
            return rejectWithValue('Cannot update name.')
        }
        return response.ok;
    } catch (e) {
        return rejectWithValue('Cannot update name.');
    }
})

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
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            if (action.payload.error) {
                state.isError = true;
                return;
            }
            const {phoneNumber, nickname, avatar, bio, name, surname} = action.payload as IUser & { error: null };
            state.avatar = avatar;
            state.phoneNumber = phoneNumber;
            state.nickname = nickname;
            state.bio = bio;
            state.name = name;
            state.surname = surname;
            state.isAuth = true;
            state.isError = false;
        })
    }
})

export const {setBio, setName} = userSlice.actions;

export const {reducer: userReducer} = userSlice;