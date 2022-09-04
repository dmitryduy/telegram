import React from 'react';
import useInput from '@hooks/useInput';
import useSocket from '@hooks/useSocket';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import cn from 'classnames';
import { addMessage } from '@reducers/dialogSlice/dialogSlice';

import Input from '../../../shared/Input/Input';
import { IMessage } from '../../../global.typings';

import { MessageInputContainer } from './MessageInput.styles';

interface IMessageInputProps {
  onHeightUpdate: () => void;
}

const MessageInput: React.FC<IMessageInputProps> = ({onHeightUpdate}) => {
  const [inputValue, changeInputValue, clearInput] = useInput();
  const activeDialog = useAppSelector(state => state.dialog.activeDialog);
  const {sendHotkey} = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();
  const messageSocket = useSocket('send message');
  const userPhone = useAppSelector(({user}) => user.phoneNumber);

  const sendMessage = () => {
    if (inputValue.trim() && userPhone) {

      const message = {
        sender: 'user',
        createdDate: Date.now(),
        text: inputValue
      } as IMessage;

      dispatch(addMessage(message));
      messageSocket.emit({
        senderPhone: userPhone,
        receiverPhone: activeDialog?.phoneNumber,
        text: message.text,
        createdDate: message.createdDate
      });
      clearInput();
    }
  };



  const sentMessageByHotkey = (e: React.KeyboardEvent<Element>) => {
    if (sendHotkey === 'enter' && e.key === 'Enter') sendMessage();
    if (sendHotkey === 'ctrl-enter' && e.key === 'Enter' && e.ctrlKey) sendMessage();
  };

  return (
    <MessageInputContainer>
      <Input
        value={inputValue}
        setValue={changeInputValue}
        placeholder="Write a message..."
        onKeyUp={sentMessageByHotkey}
      >
        <Input.TextArea onHeightUpdate={onHeightUpdate} maxLines={5}/>
      </Input>
      <button onClick={sendMessage} className={cn('send-button', {show: inputValue})}/>
    </MessageInputContainer>
  );
};

export default MessageInput;
