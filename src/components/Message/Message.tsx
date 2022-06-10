import React from 'react';

import { MessageContainer, MessageText } from "./Message.styles";

import MessageTime from './MessageTime/MessageTime';
import { avatarImage, IMessage } from "../../globalTypes";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import ReactionScroller from "../ReactionScroller/ReactionScroller";
import useThrottle from "@hooks/useThrottle";

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
            <MessageContainer onMouseEnter={onStartThrottle} onMouseLeave={onEndThrottle} showBefore={showBefore} className={isMe ? 'me': 'partner'}>
                {showBefore && <UserAvatar image={avatarImage}/>}
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
