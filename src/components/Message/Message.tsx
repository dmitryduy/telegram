import React from 'react';
import { MessageContainer, MessageText, MessageTime, NewDate, UnreadMessagesMark } from "./Message.styles";
import dateFormat from "dateformat";
import { IMessage } from "../../types";

interface IMessageProps {
    message: IMessage,
    isMe: boolean,
    isShowBefore: boolean,
    isShowNewDate: boolean,
    isShowUnread: boolean
}

const Message: React.FC<IMessageProps> = ({message, isMe, isShowBefore, isShowNewDate, isShowUnread}) => {
    return (
        <>
            {isShowNewDate && <NewDate>{dateFormat(message.createDate, 'd mmmm')}</NewDate>}
            {isShowUnread && <UnreadMessagesMark>Unread messages</UnreadMessagesMark>}
            <MessageContainer isShowBefore={isShowBefore} className={isMe? 'me': 'partner'}>
                <MessageText>{message.text}</MessageText>
                <MessageTime>{dateFormat(message.createDate, 'HH:MM')}</MessageTime>
            </MessageContainer>
        </>
    );
};

export default Message;
