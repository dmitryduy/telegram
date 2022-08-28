import React from 'react';
import useInput from '@hooks/useInput';
import SendMessage from '@images/send-button.svg';
import useSocket from '@hooks/useSocket';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import { dialogActions } from '@reducers/dialogSlice/dialogSlice';

import { MessageInputContainer } from './MessageInput.styles';

const MessageInput: React.FC = () => {
  const [inputValue, changeInputValue, clearInput] = useInput();
  const activeDialog = useAppSelector(state => state.dialog.activeDialog);
  const {sendHotkey} = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();
  const messageSocket = useSocket('send message');
  const userPhone = useAppSelector(({user}) => user.phoneNumber);

  const sendMessage = () => {
    if (inputValue && userPhone) {
      dispatch(dialogActions.addMessage({
        senderPhone: userPhone,
        createDate: Date.now(),
        text: inputValue,
        reaction: null
      }));
      messageSocket.emit({
        senderPhone: userPhone,
        receiverPhone: activeDialog?.partnerPhone,
        messageText: inputValue,
        dialogId: activeDialog?.id
      });
      clearInput();
    }
  };

  const sentMessageByHotkey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (sendHotkey === 'enter' && e.key === 'Enter') sendMessage();
    if (sendHotkey === 'ctrl-enter' && e.key === 'Enter' && e.ctrlKey) sendMessage();
  };

  return (
    <MessageInputContainer>
      <input
        onKeyUp={sentMessageByHotkey}
        type="text" value={inputValue} onInput={changeInputValue} placeholder="Write a message..."/>
      <button onClick={sendMessage} className={inputValue && 'show'}>
        <img src={SendMessage} alt="send image"/>
      </button>
    </MessageInputContainer>
  );
};

export default MessageInput;
