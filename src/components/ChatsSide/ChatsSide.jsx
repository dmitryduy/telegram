import React, { useState } from 'react';
import SearchField from "../SearchField/SearchField";
import HamburgerMenuIcon from "../HamburgerMenuIcon/HamburgerMenuIcon";
import { Chats, ChatsSideContainer, ChatsSideHeader } from "./ChatsSide.styles";
import ChatItem from "../ChatItem/ChatItem";
import { useSelector } from "react-redux";

const ChatsSide = () => {
    const dialogs = useSelector(({dialog}) => dialog.dialogs);
    const [isSearch, setSearch] = useState(false);

    return (
        <ChatsSideContainer>
            <ChatsSideHeader>
                <HamburgerMenuIcon/>
                <SearchField setSearch={setSearch} isSearch={isSearch}/>
            </ChatsSideHeader>
            <Chats>
                { !isSearch ? dialogs.map(dialog =>  <ChatItem
                        dialogId={dialog.id}
                        key={dialog.id}
                        chatImage='http://www.dejurka.ru/wp-content/uploads/2017/07/project-preview-large.png'
                        chatName={dialog.with}
                        lastMsg={dialog.messages[dialog.messages.length - 1].messageText}
                        lastMsgDate={dialog.messages[dialog.messages.length - 1].timestamp}
                    />)
                    :
                    <div>seach</div>

                }
            </Chats>

        </ChatsSideContainer>
    );
};

export default ChatsSide;
