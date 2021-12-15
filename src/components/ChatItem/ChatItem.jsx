import React from 'react';
import { ChatHeader, ChatImage, ChatItemContainer, ChatLastMessage } from "./ChatItem.styles";
import formatDate from "../../formatDate";

const ChatItem = ({chatImage, chatName, lastMsg, lastMsgDate}) => {



    return (
        <ChatItemContainer >
            <ChatImage src={chatImage} alt='chat image'/>
            <div style={{flex: 1, width: '1px'}}>
                <ChatHeader>
                    <h4>{chatName}</h4>
                    <span>{formatDate(lastMsgDate)}</span>
                </ChatHeader>
                <ChatLastMessage>{lastMsg}</ChatLastMessage>
            </div>
        </ChatItemContainer>
    );
};

export default ChatItem;
