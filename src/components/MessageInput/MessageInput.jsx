import React from 'react';
import { MessageInputContainer } from "./MessageInput.styles";
import useInput from "../../hooks/useInput";
import { writeMessageAC } from "../../reducers/userReducer";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import SendMessage from '../../assets/imgs/send-message-button.png';

const MessageInput = () => {
    const [inputValue, changeInputValue] = useInput();
    const {id} = useParams();
    const dispatch = useDispatch();

    const sendMessage = () => {
        dispatch(writeMessageAC(inputValue, +id));
    }
    return (
        <MessageInputContainer>
            <input type="text" value={inputValue} onInput={changeInputValue} placeholder='Write a message...'/>
            <button onClick={sendMessage}>
                <img src={SendMessage} alt="send image" style={{fill: 'red'}}/>
            </button>
        </MessageInputContainer>
    );
};

export default MessageInput;
