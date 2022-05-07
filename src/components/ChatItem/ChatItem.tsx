import React, { Dispatch, SetStateAction } from 'react';
import { ChatHeader, ChatItemContainer, ChatLastMessage, UnreadMessages, ChatFooter } from "./ChatItem.styles";
import formatDate from "../../formatDate";
import { dialogId, phone, timestamp } from "../../types";
import { useAppSelector } from "../../hooks/useAppSelector";
import UserAvatar from "../UserAvatar/UserAvatar";

interface IChatItemProps {
    dialogId?: dialogId,
    partnerAvatar: string,
    partnerNickname: string,
    lastMsg: string,
    partnerPhone: phone,
    lastMsgDate: timestamp | null,
    unread: number,
    setSearch?: Dispatch<SetStateAction<boolean>>
}

const ChatItem: React.FC<IChatItemProps> = ({
                                                //partnerPhone,
                                                //setSearch,
                                                lastMsg,
                                                lastMsgDate,
                                                dialogId,
                                                partnerAvatar,
                                                partnerNickname,
                                                unread
                                            }) => {
    const activeDialogId = useAppSelector(({dialog}) => dialog?.activeDialog?.dialogId);

    const setDialog = () => {
        //todo
    }


    return (
        <ChatItemContainer className={activeDialogId === dialogId ? 'active' : ''} onClick={setDialog}>
            <UserAvatar image={partnerAvatar} name={partnerNickname}/>
            <div style={{flex: 1, width: '1px'}}>
                <ChatHeader>
                    <h4>{partnerNickname}</h4>
                    {lastMsgDate && <span>{formatDate(lastMsgDate)}</span>}
                </ChatHeader>
                <ChatFooter>
                    <ChatLastMessage>{lastMsg}</ChatLastMessage>
                    {unread !== 0 && <UnreadMessages>{unread}</UnreadMessages>}
                </ChatFooter>
            </div>
        </ChatItemContainer>
    );
};

export default ChatItem;
