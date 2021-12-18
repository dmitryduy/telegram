import React, { useEffect, useRef } from 'react';
import {
    CountryCodeInput,
    LoginButton,
    LoginContainer,
    LoginSubtitle,
    LoginTitle,
    NumberInput, PhoneError
} from "./LoginPage.styles";
import useInput from "../../hooks/useInput";
import useAnimation from "../../hooks/useAnimation";
import { fetchUserInfo } from "../../reducers/userReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
    const [codeNumberInput, setCodeNumberInput] = useInput('+', /^\+[0-9]{0,3}$/);
    const [phoneInput, setPhoneInput] = useInput('', /^[0-9]{0,10}$/);
    const [numberAnimation, setNumberAnimation] = useAnimation(2000);
    const numberRef = useRef()
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const sendUserPhone = () => {
        if (phoneInput.length < 10 || codeNumberInput.length < 2) {
            setNumberAnimation();
            numberRef.current.focus();
            return;
        }
        dispatch(fetchUserInfo(codeNumberInput + phoneInput));
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
                <PhoneError className={numberAnimation && 'visible'}>Invalid phone number. Please try again</PhoneError>
                <LoginButton onClick={sendUserPhone}>log in</LoginButton>
            </div>
        </LoginContainer>
    );
};

export default LoginPage;
