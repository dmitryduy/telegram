import { fetchUserInfo } from '@reducers/userSlice/userReducer';
import { getNumericPhone } from '@pages/LoginPage/LoginPage.utils';
import { useAppDispatch } from '@hooks/useAppSelector';
import { IInputObject } from '@pages/LoginPage/LoginPage.typings';
import { initializeDialogs } from '@reducers/dialogSlice/dialogSlice';

export const useLogin = (phoneInput: IInputObject, dualCodeInput: IInputObject, nicknameInput: IInputObject) => {
  const dispatch = useAppDispatch();

  return () => {
    dispatch(fetchUserInfo({
      userPhone: getNumericPhone(phoneInput.value, dualCodeInput.value),
      nickname: nicknameInput.value
    }))
      .unwrap()
      .then(data => {
        dispatch(initializeDialogs(data.dialogs));
      });
  };
};