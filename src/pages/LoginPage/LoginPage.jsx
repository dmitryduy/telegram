import React, { useEffect, useRef, useState } from 'react';
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
import { fetchUserInfo } from "../../reducers/userReducer/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const isAuth = useSelector(({user}) => user.isAuth);

    const [codeNumberInput, setCodeNumberInput] = useInput('+', /^\+[0-9]{0,3}$/);
    const [phoneInput, setPhoneInput] = useInput('', /^[0-9]{0,10}$/);
    const [nicknameInput, setNicknameInput] = useInput('', /^[a-zA-Z0-9_]{0,20}$/)
    const [numberAnimation, setNumberAnimation] = useAnimation(2000);
    const [codeNumberAnimation, setCodeNumberAnimation] = useAnimation(2000);
    const [userNicknameAnimation, setUserNicknameAnimation] = useAnimation(2000);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(({user}) => user.error);

    const [errorMessage, setErrorMessage] = useState('');
    const sendUserPhone = () => {
        if (codeNumberInput.length < 2) {
            setCodeNumberAnimation();
            setErrorMessage('Invalid code number');
            return;
        }
        if (phoneInput.length < 10) {
            setNumberAnimation();
            setErrorMessage('Invalid phone number');
            return;
        }
        if (nicknameInput.length < 3) {
            setUserNicknameAnimation();
            setErrorMessage('Nickname must have more 3 symbols');
            return;
        }
        dispatch(fetchUserInfo(codeNumberInput + phoneInput, nicknameInput));
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
                    <CountryCodeInput className={codeNumberAnimation && 'error'} value={codeNumberInput}
                                      onInput={setCodeNumberInput}/>
                    <NumberInput className={numberAnimation && 'error'} value={phoneInput}
                                 onInput={setPhoneInput}/>
                </div>
                <NicknameTitle>Enter your nickname</NicknameTitle>
                <NicknameInput className={userNicknameAnimation && 'error'} value={nicknameInput}
                               onInput={setNicknameInput}/>
                <div>
                    <PhoneError className={errorMessage && 'visible'}>{errorMessage}</PhoneError>
                </div>
                <LoginButton onClick={sendUserPhone}>log in</LoginButton>
            </div>
        </LoginContainer>
    );
};

export default LoginPage;
