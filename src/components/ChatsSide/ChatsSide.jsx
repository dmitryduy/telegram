import React, { useState } from 'react';
import SearchField from "../SearchField/SearchField";
import HamburgerMenuIcon from "../HamburgerMenuIcon/HamburgerMenuIcon";
import { Chats, ChatsSideContainer, ChatsSideHeader } from "./ChatsSide.styles";
import ChatItem from "../ChatItem/ChatItem";
import { useSelector } from "react-redux";

const ChatsSide = () => {
    const dialogs = useSelector(({dialog}) => dialog.dialogs);
    const searchDialogs = useSelector(({dialog}) => dialog.searchResults);
    const [isSearch, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <ChatsSideContainer>
            <ChatsSideHeader>
                <HamburgerMenuIcon/>
                <SearchField setSearch={setSearch} isSearch={isSearch} setLoading={setLoading}/>
            </ChatsSideHeader>
            <Chats>
                { !isSearch ? dialogs.map(dialog =>  <ChatItem
                        dialogId={dialog.id}
                        key={dialog.id}
                        chatImage={dialog.withAvatar}
                        chatName={dialog.with}
                        lastMsg={dialog.messages[dialog.messages.length - 1].messageText}
                        lastMsgDate={dialog.messages[dialog.messages.length - 1].timestamp}
                    />)
                    :
                    loading ? <div>loading</div>
                        :
                    searchDialogs?.length ?
                        searchDialogs.map(user =>  <ChatItem
                            setSearch={setSearch}
                            dialogId={user.id}
                            key={user.id}
                            chatImage={user.avatar}
                            chatName={user.nickname}
                            phoneNumber={user.phoneNumber}
                            lastMsg={`@${user.nickname}`}
                            lastMsgDate={null}
                        />)
                        : <div>not found</div>
                }
            </Chats>

        </ChatsSideContainer>
    );
};

export default ChatsSide;
