import React from 'react';
import SearchField from "../SearchField/SearchField";
import HamburgerMenuIcon from "../HamburgerMenuIcon/HamburgerMenuIcon";
import { Chats, ChatsSideContainer, ChatsSideHeader } from "./ChatsSide.styles";
import ChatItem from "../ChatItem/ChatItem";
import { useSelector } from "react-redux";

const ChatsSide = ({activeDialog}) => {
    const dialogs = useSelector(({user}) => user.dialogs);

    return (
        <ChatsSideContainer>
            <ChatsSideHeader>
                <HamburgerMenuIcon/>
                <SearchField/>
            </ChatsSideHeader>
            <Chats>
                {dialogs.map(dialog =>  <ChatItem
                    isActive={activeDialog === dialog.id}
                    to={`/dialogs/${dialog.id}`}
                    key={dialog.id}
                    chatImage='http://www.dejurka.ru/wp-content/uploads/2017/07/project-preview-large.png'
                    chatName={dialog.with}
                    lastMsg={dialog.messages[dialog.messages.length - 1].messageText}
                    lastMsgDate={dialog.messages[dialog.messages.length - 1].timestamp}
                />)}
            </Chats>

        </ChatsSideContainer>
    );
};

export default ChatsSide;
