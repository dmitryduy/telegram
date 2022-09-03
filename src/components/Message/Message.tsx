import React from 'react';
import UserAvatar from '@components/UserAvatar/UserAvatar';
import useThrottle from '@hooks/useThrottle';

import { avatarImage, IMessage } from '../../global.typings';
import ReactionScroller from '../ReactionScroller/ReactionScroller';

import { MessageContainer, MessageText } from './Message.styles';
import MessageTime from './MessageTime/MessageTime';



interface IMessageProps {
    message: Omit<IMessage, 'senderPhone'>,
    isMe: boolean,
    showBefore: boolean,
    avatarImage: avatarImage
}

const Message: React.FC<IMessageProps> = ({message, isMe, showBefore, avatarImage}) => {
  const {isThrottle, onStartThrottle, onEndThrottle}  = useThrottle(600);

  return (
    <>
      <MessageContainer
        onMouseEnter={onStartThrottle}
        onMouseLeave={onEndThrottle}
        showBefore={showBefore}
        className={isMe ? 'me' : 'partner'}
      >
        {showBefore && <UserAvatar image={avatarImage} text={'T'}/>}
        <MessageText>
          {message.text}
          <MessageTime date={message.createDate} reaction={message.reaction}/>
        </MessageText>
        <ReactionScroller show={isThrottle} date={message.createDate}/>
      </MessageContainer>
    </>
  );
};

export default Message;
