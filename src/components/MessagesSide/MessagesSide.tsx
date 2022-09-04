import React, { useEffect, useRef } from 'react';
import MessageInput from '@components/MessagesSide/MessageInput/MessageInput';
import { useAppSelector } from '@hooks/useAppSelector';
import PartnerInfo from '@components/PartnerInfo/PartnerInfo';
import { isLastMessageByUser } from '@components/MessagesSide/MessagesSide.utils/isLastMessageByUser';
import { isNewDay } from '@components/MessagesSide/MessagesSide.utils/isNewDay';
import { isElementScrollToBottom } from '@components/MessagesSide/MessagesSide.utils/isElementScrollToBottom';

import Message from '../../shared/Message/Message';

import { Messages, MessageSideStyled, Background, EmptyActiveDialog, MessagesContent } from './MessagesSide.styles';

const MessagesSide: React.FC = () => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const messages = useAppSelector(state => state.dialog.activeDialog?.messages);
  const unreadMessageCount = useAppSelector(state => state.dialog.activeDialog?.unreadMessageCount);
  const backgroundImage = useAppSelector(({settings}) => settings.backgroundImage);
  const isScrollRef = useRef(true);


  const scrollToBottomIsNeeded = () => {
    if (messagesRef.current && isScrollRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(() => scrollToBottomIsNeeded(), [messages]);

  useEffect(() => {
    const onMessageScroll = () => {
      if (messagesRef.current && isElementScrollToBottom(messagesRef.current)) {
        isScrollRef.current = true;
        return;
      }
      if (isScrollRef.current) {
        isScrollRef.current = false;
        return;
      }
      isScrollRef.current = false;
    };

    messagesRef?.current?.addEventListener('scroll', onMessageScroll);

    return () => messagesRef?.current?.removeEventListener('scroll', onMessageScroll);
  }, []);


  return (
    <MessageSideStyled>
      <Background backgroundImage={backgroundImage}/>
      {!messages ?
        <EmptyActiveDialog>Select a chat to start messaging</EmptyActiveDialog> :
        <>
          <PartnerInfo/>
          <Messages>
            <MessagesContent ref={messagesRef}>
              {messages.map((message, index) =>
                <Message
                  key={message.createdDate + message.sender}
                  text={message.text}
                  date={message.createdDate}
                  sender={message.sender}
                  isDateTooltip={isNewDay(messages[index - 1], message)}
                  isUnreadTooltip={!!unreadMessageCount && messages.length - unreadMessageCount === index}
                  isLastMessageByUser={isLastMessageByUser(message, message[index + 1])}/>
              )}
            </MessagesContent>
          </Messages>
          <MessageInput onHeightUpdate={scrollToBottomIsNeeded}/>
        </>
      }
    </MessageSideStyled>
  );
};

export default MessagesSide;
