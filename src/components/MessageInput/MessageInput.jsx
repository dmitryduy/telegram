import React from 'react';
import { MessageInputContainer } from "./MessageInput.styles";
import useInput from "../../hooks/useInput";
import { addMessageAC } from "../../reducers/userReducer";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import SendMessage from '../../assets/imgs/send-message-button.png';
import useSocket from "../../hooks/useSocket";

const MessageInput = () => {
    const [inputValue, changeInputValue, clearInput] = useInput();
    const {id} = useParams();
    const dispatch = useDispatch();
    const messageSocket = useSocket('send message');
    const messageTo = useSelector(({user}) => user.dialogs.find(dialog => dialog.id === +id).with);
    const userId = useSelector(({user}) => user.id);

    const sendMessage = () => {
        if (inputValue) {
            dispatch(addMessageAC(inputValue, +id, +new Date(), userId));
            messageSocket.emit({messageTo: messageTo, messageText: inputValue, dialogId: +id});
            clearInput();
        }
    }
    return (
        <MessageInputContainer>
            <input
                onKeyUp={(e) => e.keyCode === 13 && sendMessage()}
                type="text" value={inputValue} onInput={changeInputValue} placeholder='Write a message...'/>
            <button onClick={sendMessage} className={inputValue && 'show'}>
                <img src={SendMessage} alt="send image" style={{fill: 'red'}}/>
            </button>
        </MessageInputContainer>
    );
};

export default MessageInput;
