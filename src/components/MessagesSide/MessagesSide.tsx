import React, { useEffect, useRef } from 'react';

import { Messages, NoContent } from "./MessagesSide.styles";

import Message from "@components/Message/Message";
import MessageInput from "@components/MessageInput/MessageInput";
import PartnerInfo from "@components/PartnerInfo/PartnerInfo";
import { useAppSelector } from "@hooks/useAppSelector";
import MessageSideContainer from "@components/MessagesSide/MessageSideContainer";

const MessagesSide: React.FC = () => {
    const scrollToRef = useRef<HTMLDivElement>(null);

    const userPhone = useAppSelector(({user}) => user.phoneNumber);
    const messages = useAppSelector(({dialog}) => dialog.activeDialog?.messages);
    //const unreadMessages = useAppSelector(({dialog}) => dialog.activeDialog?.unread);
    // @ts-ignore
    const backgroundImage = useAppSelector(({settings}) => settings.backgroundImage);


    useEffect(() => {
        scrollToRef?.current?.scrollIntoView({block: "center"});
    }, [messages]);

    if (!messages) {
        return (
            <MessageSideContainer backgroundImage={backgroundImage}>
                <NoContent>Select a chat to start messaging</NoContent>
            </MessageSideContainer>)
    }

    return (
        <MessageSideContainer backgroundImage={backgroundImage} className='content'>
             <PartnerInfo/>
             <Messages>
                {messages.map((message, index, arr) => <Message
                    avatarImage={'#45bce7'}
                    isMe={userPhone === message.senderPhone}
                    showBefore={arr[index + 1]?.senderPhone !== message.senderPhone}
                    /*isShowNewDate={ index === 0 || (new Date(arr[index - 1].createDate).getDate() !== new Date(message.createDate).getDate()
                        ||  arr[index - 1].createDate - message.createDate > 1000 * 60 * 60 * 24)}*/
                    key={message.createDate}
                    message={message}/>)}
                <div ref={scrollToRef}/>
            </Messages>
            <MessageInput/>
        </MessageSideContainer>
    );
};

export default MessagesSide;
