import React from 'react';
import { MessageInputContainer } from "./MessageInput.styles";
import useInput from "../../hooks/useInput";
import { useDispatch } from "react-redux";

import SendMessage from '../../assets/imgs/send-message-button.png';
import useSocket from "../../hooks/useSocket";
import { addMessageAC } from "../../reducers/dialogReducer/dialogReducer";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const MessageInput: React.FC = () => {
    const [inputValue, changeInputValue, clearInput] = useInput();
    const activeDialog = useTypedSelector(({dialog}) => dialog.activeDialog);
    const dispatch = useDispatch();
    const messageSocket = useSocket('send message');
    const userPhone = useTypedSelector(({user}) => user.phoneNumber);

    const sendMessage = () => {
        if (inputValue) {
            console.log(4)
            dispatch(addMessageAC({senderPhone: userPhone!, createDate: Date.now(), text: inputValue}));
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
                <img src={SendMessage} alt="send image" style={{fill: 'red'}}/>
            </button>
        </MessageInputContainer>
    );
};

export default MessageInput;
