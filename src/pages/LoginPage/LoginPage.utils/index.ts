import isNumber from '@helpers/isNumber';

import {
  COUNTRY_NOT_SELECTED,
  INVALID_DUAL_CODE, INVALID_NICKNAME,
  INVALID_PHONE_NUMBER
} from '../LoginPage.constants';


export const phoneErrorMessage = (phone: string, mask: string) => {
  return phone.length === mask.length ? '' : INVALID_PHONE_NUMBER;
};

export const dualCodeErrorMessage = (countryName: string) => {
  return countryName === INVALID_DUAL_CODE || countryName === COUNTRY_NOT_SELECTED ? INVALID_DUAL_CODE : '';
};

export const nicknameErrorMessage = (nickname: string) => (nickname.length < 3 ? INVALID_NICKNAME : '');

export const getNumericPhone = (phone: string, dualCode: string) => {
  return (dualCode + phone).split('').filter(char => isNumber(char)).join('');
};