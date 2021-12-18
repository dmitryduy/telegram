import React, { useState } from 'react';
import { ChatHeader, ChatImage, ChatItemContainer, ChatLastMessage } from "./ChatItem.styles";
import formatDate from "../../formatDate";
import { useDispatch, useSelector } from "react-redux";
import { setDialogAC } from "../../reducers/dialogReducer";

const ChatItem = ({chatImage, chatName, lastMsg, lastMsgDate, dialogId}) => {
    const activeDialogId = useSelector(({dialog}) => dialog.id);
    const dispatch = useDispatch();
    const dialog = useSelector(({dialog}) => dialog.dialogs.find(dialog => dialog.id === dialogId));

    const setDialog = () => {
        dispatch(setDialogAC(dialog));
    }


    return (
        <ChatItemContainer className={activeDialogId === dialogId && 'active'} onClick={setDialog}>
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
