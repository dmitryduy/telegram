import { INVALID_COUNTRY_CODE, NO_COUNTRY } from "../../constants";
import isNumber from "@helpers/isNumber";

const INVALID_PHONE_NUMBER_ERROR = 'Invalid phone number. Please try again.';
const INVALID_DUAL_CODE_ERROR = INVALID_COUNTRY_CODE;
const INVALID_NICKNAME = 'Nickname must have 3 more symbols';

export const checkPhone = (phone: string, mask: string) => phone.length === mask.length ? '' : INVALID_PHONE_NUMBER_ERROR;

export const checkDualCode = (countryName: string) => countryName === INVALID_COUNTRY_CODE || countryName === NO_COUNTRY ? INVALID_DUAL_CODE_ERROR : '';

export const checkNickname = (nickname: string) => nickname.length < 3? INVALID_NICKNAME: '';

export const getNumericPhone = (phone: string, dualCode: string) => {
    return (dualCode + phone).split('').filter(char => isNumber(char)).join('');
}