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

import useInput from "../../hooks/useInput";
import useAnimation from "../../hooks/useAnimation";
import { fetchUserInfo } from "../../reducers/userSlice/userReducer";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { dialogId, IDialog } from "../../types";
import { settingsActions } from "../../reducers/settingsSlice/settingsSlice";
import { dialogActions } from "../../reducers/dialogSlice/dialogSlice";

const LoginPage: React.FC = () => {
    const isAuth = useAppSelector(({user}) => user.isAuth);
    const error = useAppSelector(({user}) => user.isError);

    const [codeNumberInput, setCodeNumberInput] = useInput('+', /^\+[0-9]?$/);
    const [phoneInput, setPhoneInput] = useInput('', /^[0-9]{0,10}$/);
    const [nicknameInput, setNicknameInput] = useInput('', /^[a-zA-Z0-9_]{0,20}$/);

    const [numberAnimation, setNumberAnimation] = useAnimation(2000);
    const [codeNumberAnimation, setCodeNumberAnimation] = useAnimation(2000);
    const [userNicknameAnimation, setUserNicknameAnimation] = useAnimation(2000);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState('');
    const sendUserPhone = () => {
        if (codeNumberInput.length < 2) {
            setCodeNumberAnimation();
            setErrorMessage('Invalid code number');
            return;
        }
        if (phoneInput.length < 8) {
            setNumberAnimation();
            setErrorMessage('Invalid phone number(11 digits needed)');
            return;
        }
        if (nicknameInput.length < 3) {
            setUserNicknameAnimation();
            setErrorMessage('Nickname must have 3 or symbols');
            return;
        }
        dispatch(fetchUserInfo({userPhone: (codeNumberInput + phoneInput).slice(1), nickname: nicknameInput}))
            .unwrap()
            .then(data => {
                dispatch(dialogActions.initializeDialogs(new Map<dialogId, IDialog>(data.dialogs? data.dialogs: [])));
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

    return (
        <LoginContainer>
            <div>
                <LoginTitle>You Phone Number</LoginTitle>
                <LoginSubtitle>Please confirm your country code and enter your mobile phone number.</LoginSubtitle>
                <div>
                    <CountryCodeInput type='tel' className={cn({'error': codeNumberAnimation})} value={codeNumberInput}
                                      onInput={setCodeNumberInput}/>
                    <NumberInput type='tel' className={cn({'error': numberAnimation})} value={phoneInput}
                                 onInput={setPhoneInput}/>
                </div>
                <NicknameTitle>Enter your nickname</NicknameTitle>
                <NicknameInput type='text' className={cn({'error': userNicknameAnimation})} value={nicknameInput}
                               onInput={setNicknameInput}/>
                <div>
                    <PhoneError className={cn({'visible': errorMessage})}>{errorMessage}</PhoneError>
                </div>
                <LoginButton onClick={sendUserPhone}>log in</LoginButton>
            </div>
        </LoginContainer>
    );
};

export default LoginPage;
