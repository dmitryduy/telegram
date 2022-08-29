import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import Countries from '@components/Countries/Countries';
import { changeDialCode } from '@reducers/loginSlice/loginSlice';
import { useLoginPageInputs } from '@pages/LoginPage/LoginPage.hooks/useLoginPageInputs';
import { useLogin } from '@pages/LoginPage/LoginPage.hooks/useLogin';

import Input from '../../shared/Input/Input';
import Button from '../../shared/Button/Button';

import {
  LoginContainer,
  LoginSubtitle,
  LoginTitle,
  PhoneError
} from './LoginPage.styles';

const LoginPage: React.FC = () => {
  const isAuth = useAppSelector(({user}) => user.isAuth);
  const backendError = useAppSelector(({user}) => user.backendError);
  const {dualCode, phoneMask} = useAppSelector(state => state.login);

  const {phoneInput, dualCodeInput, nicknameInput} = useLoginPageInputs(phoneMask);
  const login = useLogin(phoneInput, dualCodeInput, nicknameInput);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = () => {
    const errorMessage = phoneInput.errorMessage || dualCodeInput.errorMessage || nicknameInput.errorMessage;

    if (errorMessage) {
      setErrorMessage(errorMessage);
      return;
    }

    login();
  };

  const onDualCodeInput = e => {
    phoneInput.setValue('');
    dualCodeInput.setValue(e);
  };

  useEffect(() => {
    if (isAuth)
      navigate('/');
  }, [isAuth]);

  useEffect(() => {
    if (backendError) {
      setErrorMessage(backendError);
    }
  }, [backendError]);

  useEffect(() => {
    dispatch(changeDialCode(dualCodeInput.value.slice(1)));
  }, [dualCodeInput.value]);

  useEffect(() => {
    dualCodeInput.setValue('+' + dualCode);
    phoneInput.setValue('');
  }, [dualCode]);

  useEffect(() => {
    setErrorMessage('');
  }, [phoneInput.value, dualCodeInput.value, nicknameInput.value]);


  return (
    <LoginContainer>
      <div>
        <LoginTitle>You Phone Number</LoginTitle>
        <LoginSubtitle>Please confirm your country code and enter your mobile phone number.</LoginSubtitle>
        <Countries/>
        <div className="phone-container">
          <Input value={dualCodeInput.value} setValue={onDualCodeInput} placeholder="">
            <Input.TextField type="tel"/>
          </Input>
          <Input value={phoneInput.value} setValue={phoneInput.setValue} placeholder={phoneMask}>
            <Input.TextField type="tel"/>
          </Input>
        </div>
        <Input value={nicknameInput.value} setValue={nicknameInput.setValue} placeholder="Enter your nickname">
          <Input.TextField/>
        </Input>
        <PhoneError className={cn({visible: errorMessage})}>{errorMessage}</PhoneError>
        <Button onClick={onLogin} text="log in" fullButton/>
      </div>
    </LoginContainer>
  );
};

export default LoginPage;
