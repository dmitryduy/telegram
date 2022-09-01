import useInput from '@hooks/useInput';
import useMask from '@hooks/useMask';
import { selectedCountryError, nicknameErrorMessage, phoneErrorMessage } from '@pages/LoginPage/LoginPage.utils';
import { COUNTRY_NOT_SELECTED, DUAL_CODE_PATTERN, NICKNAME_PATTERN } from '@pages/LoginPage/LoginPage.constants';
import { IInputObject } from '@pages/LoginPage/LoginPage.typings';


export const useLoginPageInputs = (phoneMask: string): {[key: string]: IInputObject} => {

  const [dualCodeValue, setDualCodeValue] = useInput('+', DUAL_CODE_PATTERN);
  const [phoneValue, setPhoneValue] = useMask(phoneMask);
  const [nicknameValue, setNicknameValue] = useInput('', NICKNAME_PATTERN);
  const [selectedCountryValue, setSelectedCountryValue] = useInput(COUNTRY_NOT_SELECTED);

  return {
    dualCodeInput: {
      value: dualCodeValue,
      setValue: setDualCodeValue,
      errorMessage: ''
    },
    phoneInput: {
      value: phoneValue,
      setValue: setPhoneValue,
      errorMessage: phoneErrorMessage(phoneValue, phoneMask)
    },
    nicknameInput: {
      value: nicknameValue,
      setValue: setNicknameValue,
      errorMessage: nicknameErrorMessage(nicknameValue)
    },
    selectedCountryInput: {
      value: selectedCountryValue,
      setValue: setSelectedCountryValue,
      errorMessage: selectedCountryError(selectedCountryValue)
    }
  };
};