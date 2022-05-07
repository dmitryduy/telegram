import React, { useEffect, useRef } from 'react';

import { Messages, MessagesSideContainer, NoContent } from "./MessagesSide.styles";

import Message from "../Message/Message";
import MessageInput from "../MessageInput/MessageInput";
import PartnerInfo from "../PartnerInfo/PartnerInfo";
import { useAppSelector } from "../../hooks/useAppSelector";

const MessagesSide: React.FC = () => {
    const scrollToRef = useRef<HTMLDivElement>(null);

    const userPhone = useAppSelector(({user}) => user.phoneNumber);
    const messages = useAppSelector(({dialog}) => dialog.activeDialog?.messages);
    const unreadMessages = useAppSelector(({dialog}) => dialog.activeDialog?.unread);
    // @ts-ignore
    const backgroundImage = useAppSelector(({settings}) => settings.backgroundImage);


    useEffect(() => {
        scrollToRef?.current?.scrollIntoView({ block: "center"});
    }, [messages]);

    if (!messages) {
        return (
            <MessagesSideContainer backgroundImage={backgroundImage}>
                <NoContent>Select a chat to start messaging</NoContent>
            </MessagesSideContainer>)
    }

    return (
        <MessagesSideContainer backgroundImage={backgroundImage} className='content'>
            <PartnerInfo/>
            <Messages>
                {messages.map((message, index, arr) => <Message
                    isMe={userPhone === message.senderPhone}
                    isShowBefore={arr[index + 1]?.senderPhone !== message.senderPhone}
                    isShowUnread={arr.length - unreadMessages! === index}
                    isShowNewDate={ index === 0 || (new Date(arr[index - 1].createDate).getDate() !== new Date(message.createDate).getDate()
                        ||  arr[index - 1].createDate - message.createDate > 1000 * 60 * 60 * 24)}
                    key={message.createDate}
                    message={message}/>)}
                <div ref={scrollToRef}/>
            </Messages>
            <MessageInput/>
        </MessagesSideContainer>
    );
};

export default MessagesSide;
