
import { IFetchUserInfoAC, ISetErrorAC, IUserReducerState, userActionType, UserReducerAction } from "./types";
import { dialogId, IDialog, phone } from "../../../backend/types";
import { Dispatch } from "react";
import { initializeDialogsAC } from "../dialogReducer/dialogReducer";
import { IInitializeDialogsAC } from "../dialogReducer/types";
import { setBackgroundImage } from "../settingsReducer/settingsReducer";
import { ISetBackgroundImage } from "../settingsReducer/types";

const initialState: IUserReducerState = {
    isError: false,
    isAuth: false,
    phoneNumber: null,
    nickname: null,
    avatar: null
}

const userReducer = (state = initialState, action: UserReducerAction): IUserReducerState => {
    switch (action.type) {
        case userActionType.FETCH_USER_INFO:
            return {...state, ...action.payload, isAuth: true};
        case userActionType.INCORRECT_DATA:
            return {...state, isError: true};
        default:
            return {...state};
    }
}

const fetchUserInfoAC = (userInfo: {
    phoneNumber: phone,
    nickname: string,
    avatar: string
}): IFetchUserInfoAC => ({
    type: userActionType.FETCH_USER_INFO,
    payload: userInfo
})

const setErrorAC = (): ISetErrorAC => ({
    type: userActionType.INCORRECT_DATA
})

export const fetchUserInfo = (userPhone: phone, nickname: string) => async (dispatch: Dispatch<UserReducerAction | IInitializeDialogsAC | ISetBackgroundImage>) => {
    const response = await fetch('https://telegram-server-part.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({userPhone, nickname})
    });

    const data = await response.json();
    if (data.error) {
        dispatch(setErrorAC());
        return;
    }
    dispatch(fetchUserInfoAC({
        phoneNumber: data.phoneNumber,
        nickname: data.nickname,
        avatar: data.avatar
    }));
    dispatch(initializeDialogsAC(data.dialogs ? new Map<dialogId, IDialog>(data.dialogs ): null));
    dispatch(setBackgroundImage(data.backgroundImage));

}

export default userReducer;