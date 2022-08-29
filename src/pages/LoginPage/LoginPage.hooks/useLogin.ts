import { fetchUserInfo } from '@reducers/userSlice/userReducer';
import { getNumericPhone } from '@pages/LoginPage/LoginPage.utils';
import { dialogActions } from '@reducers/dialogSlice/dialogSlice';
import { useAppDispatch } from '@hooks/useAppSelector';
import { IInputObject } from '@pages/LoginPage/LoginPage.typings';

import { dialogsToObject } from '../../../utils/dialogsToObject';

export const useLogin = (phoneInput: IInputObject, dualCodeInput: IInputObject, nicknameInput: IInputObject) => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(fetchUserInfo({
      userPhone: getNumericPhone(phoneInput.value, dualCodeInput.value),
      nickname: nicknameInput.value
    }))
      .unwrap()
      .then(data => {
        dispatch(dialogActions.initializeDialogs(dialogsToObject(data.dialogs)));
      });
  };
};