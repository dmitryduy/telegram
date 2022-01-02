import React, { useEffect, useRef } from 'react';
import { Messages, MessagesSideContainer, NoContent } from "./MessagesSide.styles";
import Message from "../Message/Message";
import MessageInput from "../MessageInput/MessageInput";
import PartnerInfo from "../PartnerInfo/PartnerInfo";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const MessagesSide: React.FC = () => {
    const userPhone = useTypedSelector(({user}) => user.phoneNumber);
    const scrollToRef = useRef<HTMLDivElement>(null);
    const messages = useTypedSelector(({dialog}) => dialog.activeDialog?.messages);

    useEffect(() => {
        scrollToRef?.current?.scrollIntoView({ block: "center"});
    }, [messages]);

    if (!messages) {
        return (
            <MessagesSideContainer>
                <NoContent>Select a chat to start messaging</NoContent>
            </MessagesSideContainer>)
    }


    return (
        <MessagesSideContainer className='content'>
            <PartnerInfo/>
            <Messages>
                {messages.map((message, index, arr) => <Message
                    isMe={userPhone === message.senderPhone}
                    isShowBefore={arr[index + 1]?.senderPhone !== message.senderPhone}
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
