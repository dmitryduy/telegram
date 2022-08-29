import useInput from '@hooks/useInput';
import useMask from '@hooks/useMask';
import { dualCodeErrorMessage, nicknameErrorMessage, phoneErrorMessage } from '@pages/LoginPage/LoginPage.utils';
import { useAppSelector } from '@hooks/useAppSelector';
import { DUAL_CODE_PATTERN, NICKNAME_PATTERN } from '@pages/LoginPage/LoginPage.constants';
import { IInputObject } from '@pages/LoginPage/LoginPage.typings';


export const useLoginPageInputs = (phoneMask: string): {[key: string]: IInputObject} => {
  const {countryName} = useAppSelector(state => state.login);

  const [dualCodeValue, setDualCodeValue] = useInput('+', DUAL_CODE_PATTERN);
  const [phoneValue, setPhoneValue] = useMask(phoneMask);
  const [nicknameValue, setNicknameValue] = useInput('', NICKNAME_PATTERN);

  return {
    dualCodeInput: {
      value: dualCodeValue,
      setValue: setDualCodeValue,
      errorMessage: dualCodeErrorMessage(countryName)
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
    }
  };
};