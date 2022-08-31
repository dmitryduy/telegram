import isNumber from '@helpers/isNumber';

import {
  COUNTRY_NOT_SELECTED,
  INVALID_COUNTRY_CODE,
  INVALID_NICKNAME,
  INVALID_PHONE_NUMBER
} from '../LoginPage.constants';


export const phoneErrorMessage = (phone: string, mask: string) => {
  return phone.length === mask.length ? '' : INVALID_PHONE_NUMBER;
};

export const selectedCountryError = (selectedCountry: string) => {
  return selectedCountry === INVALID_COUNTRY_CODE || selectedCountry === COUNTRY_NOT_SELECTED ?
    INVALID_COUNTRY_CODE :
    '';
};

export const nicknameErrorMessage = (nickname: string) => (nickname.length < 3 ? INVALID_NICKNAME : '');

export const getNumericPhone = (phone: string, dualCode: string) => {
  return (dualCode + phone).split('').filter(char => isNumber(char)).join('');
};