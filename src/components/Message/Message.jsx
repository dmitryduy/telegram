import React from 'react';
import formatDate from "../../formatDate";
import { MessageContainer, MessageText, MessageTime, NewDate } from "./Message.styles";

const Message = ({message, isMe, showBefore, showNewDate}) => {
    return (
        <>
            {showNewDate && <NewDate>4 Декабря</NewDate>}
            <MessageContainer showBefore={showBefore} className={isMe? 'me': 'partner'}>
                <MessageText>{message.messageText}</MessageText>
                <MessageTime>{formatDate(message.timestamp)}</MessageTime>
            </MessageContainer>
        </>
    );
};

export default Message;
