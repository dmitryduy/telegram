import { phone } from "../../types";


export enum userActionType {
    FETCH_USER_INFO = 'FETCH_USER_INFO',
    INCORRECT_DATA = 'INCORRECT_DATA'
}

export interface IFetchUserInfoAC {
    type: userActionType.FETCH_USER_INFO,
    payload:  {
        phoneNumber: phone,
        nickname: string,
        avatar: string
    }
}


export interface ISetErrorAC {
    type: userActionType.INCORRECT_DATA
}

export type UserReducerAction = IFetchUserInfoAC | ISetErrorAC;

export interface IUserReducerState{
    isError: boolean,
    isAuth: boolean,
    phoneNumber: phone | null,
    nickname: string | null,
    avatar: string| null
}