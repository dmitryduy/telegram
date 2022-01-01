import React, { useState } from 'react';
import SearchField from "../SearchField/SearchField";
import HamburgerMenuIcon from "../HamburgerMenuIcon/HamburgerMenuIcon";
import { Chats, ChatsSideContainer, ChatsSideHeader } from "./ChatsSide.styles";
import ChatItem from "../ChatItem/ChatItem";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { dialogId, timestamp } from "../../../backend/types";

interface IDialogToArray {
    dialogId: dialogId,
    partnerAvatar: string,
    partnerNickname: string,
    lastMsg: string,
    lastMsgDate: timestamp
}

const ChatsSide = () => {
    const dialogs = useTypedSelector(({dialog}) => dialog.dialogs);
    const dialogsToArray: IDialogToArray[] = [];
    dialogs?.forEach((dialog, dialogId) => {
        dialogsToArray.push({
            dialogId: dialogId,
            partnerAvatar: dialog.partnerAvatar,
            partnerNickname: dialog.partnerNickname,
            lastMsg: dialog.messages[dialog.messages.length - 1].text,
            lastMsgDate: dialog.messages[dialog.messages.length - 1].createDate
        })  ;
    })
    const foundedGlobalUsers = useTypedSelector(({dialog}) => dialog.foundedGlobalUsers);
    const [isSearch, setSearch] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
        <ChatsSideContainer>
            <ChatsSideHeader>
                <HamburgerMenuIcon/>
                <SearchField setSearch={setSearch} isSearch={isSearch} setLoading={setLoading}/>
            </ChatsSideHeader>
            <Chats>
                { !isSearch ? dialogsToArray.map(dialog =>  <ChatItem
                        dialogId={dialog.dialogId}
                        key={dialog.dialogId}
                        partnerAvatar={dialog.partnerAvatar}
                        partnerNickname={dialog.partnerNickname}
                        lastMsg={dialog.lastMsg}
                        lastMsgDate={dialog.lastMsgDate}
                    />)
                    :
                    loading ? <div>loading</div>
                        :
                        foundedGlobalUsers?.length ?
                            foundedGlobalUsers.map(globalUser =>  <ChatItem
                            setSearch={setSearch}
                            key={globalUser.partnerPhone}
                            partnerAvatar={globalUser.partnerAvatar}
                            partnerNickname={globalUser.partnerNickname}
                            partnerPhone={globalUser.partnerPhone}
                            lastMsg={`@${globalUser.partnerNickname}`}
                            lastMsgDate={null}
                        />)
                        : <div>not found</div>
                }
            </Chats>

        </ChatsSideContainer>
    );
};

export default ChatsSide;
