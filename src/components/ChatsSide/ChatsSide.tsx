import React, { useState } from 'react';

import { ChatsContainer, ChatsSideContainer, ChatsSideHeader } from "./ChatsSide.styles";

import SearchField from "../SearchField/SearchField";
import HamburgerMenuIcon from "../HamburgerMenuIcon/HamburgerMenuIcon";
import Chats from "../Chats/Chats";

const ChatsSide = () => {
    const [isSearch, setSearch] = useState(false);
    const [isLoading, setLoading] = useState(false);

    return (
        <ChatsSideContainer>
            <ChatsSideHeader>
                <HamburgerMenuIcon/>
                <SearchField setSearch={setSearch} isSearch={isSearch} setLoading={setLoading}/>
            </ChatsSideHeader>
            <ChatsContainer>
                <Chats isSearch={isSearch} isLoading={isLoading} setSearch={setSearch}/>
            </ChatsContainer>
        </ChatsSideContainer>
    );
};

export default ChatsSide;
