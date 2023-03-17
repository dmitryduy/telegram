import React, { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import { isNewDay } from '@components/MessagesSide/MessagesSide.utils/isNewDay';
import { isLastMessageByUser } from '@components/MessagesSide/MessagesSide.utils/isLastMessageByUser';
import { useAppSelector } from '@hooks/useAppSelector';
import { isShowUnreadTooltip } from '@components/MessagesSide/MessagesSide.utils/isShowUnreadTooltip';
import { useEventListener } from '@hooks/useEventListener';
import { isElementScrollToBottom } from '@components/MessagesSide/MessagesSide.utils/isElementScrollToBottom';
import PartnerInfo from '@components/PartnerInfo/PartnerInfo';
import MessageInput from '@components/MessagesSide/MessageInput/MessageInput';

import Message from '../../../shared/Message/Message';
import Loader from '../../../shared/Loader/Loader';

import { MessagesStyled, MessagesContent } from './Messages.styles';

const Messages = () => {
  const activeDialog = useAppSelector(state => state.dialog.activeDialog);
  const isLoading = useAppSelector(state => state.dialog.isActiveDialogLoaded);
  const messagesRef = useRef<HTMLDivElement>(null);
  const isScrollRef = useRef(true);


  const scrollToBottomIsNeeded = (forceScroll?: boolean, isSmooth = true) => {
    if (messagesRef.current && (forceScroll || isScrollRef.current)) {
      if (isSmooth) {
        messagesRef.current.scrollTo({top: messagesRef.current.scrollHeight, behavior: 'smooth'});
        return;
      }

      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };

  useEffect(() => scrollToBottomIsNeeded(), [activeDialog?.messages]);

  useLayoutEffect(() => scrollToBottomIsNeeded(true, false), [activeDialog?.phoneNumber, isLoading]);

  const onMessageScroll = useCallback(() => {
    if (messagesRef.current && isElementScrollToBottom(messagesRef.current)) {
      isScrollRef.current = true;
      return;
    }
    if (isScrollRef.current) {
      isScrollRef.current = false;
      return;
    }
    isScrollRef.current = false;
  }, []);

  useEventListener('scroll', onMessageScroll, messagesRef);

  return (
    <>
      {activeDialog && <PartnerInfo/>}
      {isLoading ?
        <Loader/> :
        <>
          <MessagesStyled>
            <MessagesContent ref={messagesRef}>
              {activeDialog?.messages.map((message, index, messages) =>
                <Message
                  key={message.createdDate + message.sender}
                  text={message.text}
                  date={message.createdDate}
                  sender={message.sender}
                  isDateTooltip={isNewDay(messages[index - 1], message)}
                  isUnreadTooltip={isShowUnreadTooltip(activeDialog?.unreadMessageCount, messages.length, index)}
                  isLastMessageByUser={isLastMessageByUser(message, message[index + 1])}/>
              )}
            </MessagesContent>
          </MessagesStyled>
          <MessageInput scrollToBottomIsNeeded={scrollToBottomIsNeeded}/>
        </>
      }
    </>
  );
};

export default Messages;