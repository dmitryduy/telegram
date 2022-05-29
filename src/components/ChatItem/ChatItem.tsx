import React, { Dispatch, SetStateAction } from 'react';
import { ChatHeader, ChatItemContainer, ChatLastMessage, UnreadMessages } from "./ChatItem.styles";
import formatDate from "../../formatDate";
import { phone, timestamp } from "../../globalTypes";
import { useAppSelector } from "@hooks/useAppSelector";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import { FlexContainer } from '@styled-components/FlexContainer';

interface IChatItemProps {
    dialogId?: number,
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
    const {themeColor} = useAppSelector(state => state.settings);

    const setDialog = () => {
        //todo
    }


    return (
        <ChatItemContainer color={themeColor} className={activeDialogId === dialogId ? 'active' : ''} onClick={setDialog}>
            <UserAvatar style={{marginRight: 15}} image={partnerAvatar}/>
            <div style={{flex: 1}}>
                <ChatHeader>
                    <h4>{partnerNickname}</h4>
                    {lastMsgDate && <span>{formatDate(lastMsgDate)}</span>}
                </ChatHeader>
                <FlexContainer>
                    <ChatLastMessage>{lastMsg}</ChatLastMessage>
                    {unread !== 0 && <UnreadMessages color={themeColor}>{unread}</UnreadMessages>}
                </FlexContainer>
            </div>
        </ChatItemContainer>
    );
};

export default ChatItem;
