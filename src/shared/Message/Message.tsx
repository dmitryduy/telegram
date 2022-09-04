import React from 'react';
import cn from 'classnames';
import dateFormat from 'dateformat';

import { MessageStyled, MessageContent } from './Message.styles';
import DateTooltip from './DateTooltip/DateTooltip';
import UnreadTooltip from './UnreadTooltip/UnreadTooltip';

interface MessageComponent {
  DateTooltip: typeof DateTooltip;
  UnreadTooltip: typeof UnreadTooltip;
}

interface IMessageProps {
  text: string;
  date: number;
  sender: 'user' | 'partner';
  isLastMessageByUser: boolean;
  isDateTooltip: boolean;
  isUnreadToolip: boolean;
}

const Message: React.FC<IMessageProps> & MessageComponent = ({
  text,
  date,
  sender,
  isLastMessageByUser,
  isDateTooltip,
  isUnreadToolip
}) => {
  return (
    <>
      {isDateTooltip && <Message.DateTooltip timestamp={date}/>}
      {isUnreadToolip && <Message.UnreadTooltip/>}
      <MessageStyled>
        <MessageContent
          decorate={isLastMessageByUser}
          className={cn({user: sender === 'user', partner: sender === 'partner'})}
        >
          <span className="text">{text}</span>
          <span className="date">{dateFormat(date, 'hh mm')}</span>
        </MessageContent>
      </MessageStyled>
    </>
  );
};

Message.DateTooltip = DateTooltip;
Message.UnreadTooltip = UnreadTooltip;

export default Message;