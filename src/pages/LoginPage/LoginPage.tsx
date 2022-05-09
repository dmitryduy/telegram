import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import cn from "classnames";

import {
    CountryCodeInput,
    LoginButton,
    LoginContainer,
    LoginSubtitle,
    LoginTitle, NicknameInput, NicknameTitle,
    NumberInput, PhoneError
} from "./LoginPage.styles";

import useInput from "@hooks/useInput";
import { fetchUserInfo } from "@reducers/userSlice/userReducer";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import { settingsActions } from "@reducers/settingsSlice/settingsSlice";
import { dialogActions } from "@reducers/dialogSlice/dialogSlice";
import dialogsToObject from "../../dialogsToObject";
import useMask from "@hooks/useMask";
import Countries from "@components/Countries/Countries";
import { changeDialCode } from "@reducers/loginSlice/loginSlice";
import { checkDualCode, checkNickname, checkPhone, getNumericPhone } from "./helpers";

const LoginPage: React.FC = () => {
    const isAuth = useAppSelector(({user}) => user.isAuth);
    const error = useAppSelector(({user}) => user.isError);
    const {dualCode, countryName, phoneMask: mask} = useAppSelector(state => state.login);

    const [codeNumberValue, setCodeNumberValue] = useInput('+', /^\+\d{0,4}$/);
    const [phoneValue, setPhoneValue, clearPhoneValue] = useMask(mask);
    const [nicknameValue, setNicknameValue] = useInput('', /^[a-zA-Z0-9_]{0,20}$/);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');

    const login = () => {
        const errorMessage = checkDualCode(countryName) || checkPhone(phoneValue, mask) || checkNickname(nicknameValue);

        if (errorMessage) {
            setErrorMessage(errorMessage);
            return;
        }

        dispatch(fetchUserInfo({userPhone: getNumericPhone(phoneValue, codeNumberValue), nickname: nicknameValue}))
            .unwrap()
            .then(data => {
                dispatch(dialogActions.initializeDialogs(dialogsToObject(data.dialogs)));
                dispatch(settingsActions.setBackgroundImage(data.backgroundImage));
            });
    }

    useEffect(() => {
        if (isAuth)
            navigate('/');
    }, [isAuth]);

    useEffect(() => {
        if (error) {
            setErrorMessage('Incorrect username');
        }
    }, [error]);

    useEffect(() => {
        dispatch(changeDialCode(codeNumberValue.slice(1)));
    }, [codeNumberValue]);

    useEffect(() => {
        setCodeNumberValue('+' + dualCode);
        clearPhoneValue();
    }, [dualCode]);

    useEffect(() => {
        setErrorMessage('');
    }, [codeNumberValue, phoneValue, nicknameValue])


    return (
        <LoginContainer>
            <div>
                <LoginTitle>You Phone Number</LoginTitle>
                <LoginSubtitle>Please confirm your country code and enter your mobile phone number.</LoginSubtitle>
                <Countries/>
                <div>
                    <CountryCodeInput type='tel' value={codeNumberValue}
                                      onInput={(e) => {
                                          clearPhoneValue();
                                          setCodeNumberValue(e);
                                      }}/>
                    <NumberInput placeholder={mask} type='tel' value={phoneValue} onInput={setPhoneValue}/>
                </div>
                <NicknameTitle>Enter your nickname</NicknameTitle>
                <NicknameInput type='text' value={nicknameValue} onInput={setNicknameValue}/>
                <div>
                    <PhoneError className={cn({'visible': errorMessage})}>{errorMessage}</PhoneError>
                </div>
                <LoginButton onClick={login}>log in</LoginButton>
            </div>
        </LoginContainer>
    );
};

export default LoginPage;
