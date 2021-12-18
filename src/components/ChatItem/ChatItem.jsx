import React  from 'react';
import { ChatHeader, ChatImage, ChatItemContainer, ChatLastMessage } from "./ChatItem.styles";
import formatDate from "../../formatDate";
import { useDispatch, useSelector } from "react-redux";
import { removeSearchResultsAC, setDialogAC } from "../../reducers/dialogReducer";

const ChatItem = ({chatImage, chatName, lastMsg, lastMsgDate, dialogId, setSearch}) => {
    const activeDialogId = useSelector(({dialog}) => dialog?.activeDialog?.id);
    const dispatch = useDispatch();
    const dialog = useSelector(({dialog}) => dialog.dialogs.find(dialog => dialog.id === dialogId));

    const setDialog = () => {
        if (!dialog) {
            dispatch(setDialogAC({id: +new Date(), with: chatName, messages: []}));
            dispatch(removeSearchResultsAC());
            setSearch(false);
        }
        else {
            dispatch(setDialogAC(dialog));
        }
    }


    return (
        <ChatItemContainer className={activeDialogId === dialogId && 'active'} onClick={setDialog}>
            <ChatImage src={chatImage} alt='chat image'/>
            <div style={{flex: 1, width: '1px'}}>
                <ChatHeader>
                    <h4>{chatName}</h4>
                    {lastMsgDate && <span>{formatDate(lastMsgDate)}</span>}
                </ChatHeader>
                <ChatLastMessage>{lastMsg}</ChatLastMessage>
            </div>
        </ChatItemContainer>
    );
};

export default ChatItem;
