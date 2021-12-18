import React, { useEffect, useRef } from 'react';
import { Messages, MessagesSideContainer, NoContent } from "./MessagesSide.styles";
import Message from "../Message/Message";
import {  useSelector } from "react-redux";
import MessageInput from "../MessageInput/MessageInput";

const MessagesSide = () => {
    const userId = useSelector(({user}) => user.id);
    const scrollToRef = useRef(null);
    const messages = useSelector(({dialog}) => dialog.activeDialog?.messages);

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
            <Messages>
                {messages.map((message, index, arr) => <Message
                    isMe={userId === message.sender}
                    showBefore={arr[index + 1]?.sender !== message.sender}
                    showNewDate={ index === 0 || (new Date(arr[index - 1].timestamp).getDate() !== new Date(message.timestamp).getDate()
                        ||  arr[index - 1].timestamp - message.timestamp > 1000 * 60 * 60 * 24)}
                    key={message.timestamp}
                    message={message}/>)}
                <div ref={scrollToRef}/>
            </Messages>
            <MessageInput/>
        </MessagesSideContainer>
    );
};

export default MessagesSide;
