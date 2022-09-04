import React from 'react';
import MessageInput from '@components/MessageInput/MessageInput';
import { useAppSelector } from '@hooks/useAppSelector';
import PartnerInfo from '@components/PartnerInfo/PartnerInfo';
import { isLastMessageByUser } from '@components/MessagesSide/MessagesSide.utils/isLastMessageByUser';
import { isNewDay } from '@components/MessagesSide/MessagesSide.utils/isNewDay';

import Message from '../../shared/Message/Message';

import { Messages, MessageSideStyled, Background, EmptyActiveDialog } from './MessagesSide.styles';

const MessagesSide: React.FC = () => {
  //const scrollToRef = useRef<HTMLDivElement>(null);

  const messages = useAppSelector(state => state.dialog.activeDialog?.messages);
  const unreadMessageCount = useAppSelector(state => state.dialog.activeDialog?.unreadMessageCount);
  const backgroundImage = useAppSelector(({settings}) => settings.backgroundImage);


  /*useEffect(() => {
        scrollToRef?.current?.scrollIntoView({block: "center"});
    }, [messages]);*/

  return (
    <MessageSideStyled className="content">
      <Background backgroundImage={backgroundImage}/>
      {!messages && <EmptyActiveDialog>Select a chat to start messaging</EmptyActiveDialog>}
      {messages &&
      <>
        <PartnerInfo/>
        <Messages>
          {messages.map((message, index) =>
            <Message
              text={message.text}
              date={message.createdDate}
              sender={message.sender}
              isDateTooltip={isNewDay(messages[index - 1], message)}
              isUnreadToolip={!!unreadMessageCount && messages.length - unreadMessageCount === index}
              isLastMessageByUser={isLastMessageByUser(message, message[index + 1])}/>
          )}
        </Messages>
        <MessageInput/>
      </>
      }
    </MessageSideStyled>
  );
};

export default MessagesSide;
