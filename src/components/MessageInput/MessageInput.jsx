import React from 'react';
import { MessageInputContainer } from "./MessageInput.styles";
import useInput from "../../hooks/useInput";
import { useDispatch, useSelector } from "react-redux";

import SendMessage from '../../assets/imgs/send-message-button.png';
import useSocket from "../../hooks/useSocket";
import { addMessageAC } from "../../reducers/dialogReducer";

const MessageInput = () => {
    const [inputValue, changeInputValue, clearInput] = useInput();
    const activeDialog = useSelector(({dialog}) => dialog.activeDialog);
    const dispatch = useDispatch();
    const messageSocket = useSocket('send message');
    const messageTo = useSelector(({dialog}) => dialog.activeDialog.with);
    const userId = useSelector(({user}) => user.id);

    const sendMessage = () => {
        if (inputValue) {
            dispatch(addMessageAC({timestamp:1111111, sender: userId, messageText: inputValue}));
            messageSocket.emit({messageTo: messageTo, messageText: inputValue, dialogId: activeDialog.id});
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
