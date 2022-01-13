import { phone } from "./types";

export interface INewMessagePopup {
    text: string,
    partnerAvatar: string,
    partnerNickname: string,
    partnerPhone: phone
}