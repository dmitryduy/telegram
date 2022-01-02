import React from 'react';
import { MessageContainer, MessageText, MessageTime, NewDate } from "./Message.styles";
import dateFormat from "dateformat";
import { IMessage } from "../../../backend/types";

interface IMessageProps {
    message: IMessage,
    isMe: boolean,
    isShowBefore: boolean,
    isShowNewDate: boolean
}

const Message: React.FC<IMessageProps> = ({message, isMe, isShowBefore, isShowNewDate}) => {
    return (
        <>
            {isShowNewDate && <NewDate>{dateFormat(message.createDate, 'd mmmm')}</NewDate>}
            <MessageContainer isShowBefore={isShowBefore} className={isMe? 'me': 'partner'}>
                <MessageText>{message.text}</MessageText>
                <MessageTime>{dateFormat(message.createDate, 'HH:MM')}</MessageTime>
            </MessageContainer>
        </>
    );
};

export default Message;
