import React, { useEffect, useRef } from 'react';
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
import { fetchUserInfo } from "../../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [codeNumberInput, setCodeNumberInput] = useInput('+', /^\+[0-9]{0,3}$/);
    const [phoneInput, setPhoneInput] = useInput('', /^[0-9]{0,10}$/);
    const [nicknameInput, setNicknameInput] = useInput('', /^[a-zA-Z0-9_]{0,20}$/)
    const [numberAnimation, setNumberAnimation] = useAnimation(2000);
    const numberRef = useRef()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(({user}) => user.error);

    const sendUserPhone = () => {
        if (phoneInput.length < 10 || codeNumberInput.length < 2 || nicknameInput.length < 1) {
            setNumberAnimation();
            numberRef.current.focus();
            return;
        }
        dispatch(fetchUserInfo(codeNumberInput + phoneInput, nicknameInput));
    }

    useEffect(() => {
        return () => {
            navigate('/');
        };
    }, []);


    return (
        <LoginContainer>
            <div>
                <LoginTitle>You Phone Number</LoginTitle>
                <LoginSubtitle>Please confirm your country code and enter your mobile phone number.</LoginSubtitle>
                <div>
                    <CountryCodeInput value={codeNumberInput} onInput={setCodeNumberInput}/>
                    <NumberInput ref={numberRef} className={numberAnimation && 'error'} value={phoneInput}
                                 onInput={setPhoneInput}/>
                </div>
                <NicknameTitle>Enter your nickname</NicknameTitle>
                <NicknameInput value={nicknameInput} onInput={setNicknameInput}/>
                <div>
                    <PhoneError className={numberAnimation || error && 'visible'}>Invalid phone number. or nickname. Please try again</PhoneError>
                </div>
                <LoginButton onClick={sendUserPhone}>log in</LoginButton>
            </div>
        </LoginContainer>
    );
};

export default LoginPage;
