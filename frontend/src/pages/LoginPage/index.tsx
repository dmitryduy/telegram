import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { useAppSelector } from '@hooks/useAppSelector';
import Countries from '@components/Countries/Countries';
import { useLoginPageInputs } from '@pages/LoginPage/LoginPage.hooks/useLoginPageInputs';
import { useLogin } from '@pages/LoginPage/LoginPage.hooks/useLogin';
import { CountriesContext } from '@pages/LoginPage/CountriesContext';

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
  const [phoneMask, setPhoneMask] = useState('');

  const {phoneInput, dualCodeInput, nicknameInput, selectedCountryInput} = useLoginPageInputs(phoneMask);
  const login = useLogin(phoneInput, dualCodeInput, nicknameInput);

  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState('');

  const onLogin = () => {
    const errorMessage = phoneInput.errorMessage || selectedCountryInput.errorMessage || nicknameInput.errorMessage;

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
    setErrorMessage('');
  }, [phoneInput.value, dualCodeInput.value, nicknameInput.value]);

  return (
    <CountriesContext.Provider value={{
      setDualCode: dualCodeInput.setValue,
      setPhoneMask,
      setSelectedCountry: selectedCountryInput.setValue,
      dualCode: dualCodeInput.value
    }}>
      <LoginContainer>
        <div>
          <LoginTitle>You Phone Number</LoginTitle>
          <LoginSubtitle>Please confirm your country code and enter your mobile phone number.</LoginSubtitle>
          <Countries selectedCountry={selectedCountryInput.value}/>
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
    </CountriesContext.Provider>
  );
};

export default LoginPage;
