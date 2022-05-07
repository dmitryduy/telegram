import React from 'react';
import { MessageInputContainer } from "./MessageInput.styles";
import useInput from "../../hooks/useInput";

import SendMessage from '../../assets/imgs/send-button.svg';
import useSocket from "../../hooks/useSocket";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { dialogActions } from "../../reducers/dialogSlice/dialogSlice";

const MessageInput: React.FC = () => {
    const [inputValue, changeInputValue, clearInput] = useInput();
    const activeDialog = useAppSelector(({dialog}) => dialog.activeDialog);
    const dispatch = useAppDispatch();
    const messageSocket = useSocket('send message');
    const userPhone = useAppSelector(({user}) => user.phoneNumber);

    const sendMessage = () => {
        if (inputValue) {
            dispatch(dialogActions.addMessage({senderPhone: userPhone!, createDate: Date.now(), text: inputValue}));
            messageSocket.emit({senderPhone: userPhone,receiverPhone: activeDialog?.partnerPhone,  messageText: inputValue, dialogId: activeDialog?.dialogId});
            clearInput();
        }
    }
    return (
        <MessageInputContainer>
            <input
                onKeyUp={(e) => e.keyCode === 13 && sendMessage()}
                type="text" value={inputValue} onInput={changeInputValue} placeholder='Write a message...'/>
            <button onClick={sendMessage} className={inputValue && 'show'}>
                <img src={SendMessage} alt="send image"/>
            </button>
        </MessageInputContainer>
    );
};

export default MessageInput;
