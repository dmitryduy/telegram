import React from 'react';
import { MessageContainer, MessageText, MessageTime, NewDate } from "./Message.styles";
import dateFormat from "dateformat";

const Message = ({message, isMe, showBefore, showNewDate}) => {
    return (
        <>
            {showNewDate && <NewDate>{dateFormat(message.timestamp, 'd mmmm')}</NewDate>}
            <MessageContainer showBefore={showBefore} className={isMe? 'me': 'partner'}>
                <MessageText>{message.messageText}</MessageText>
                <MessageTime>{dateFormat(message.timestamp, 'HH:MM')}</MessageTime>
            </MessageContainer>
        </>
    );
};

export default Message;
