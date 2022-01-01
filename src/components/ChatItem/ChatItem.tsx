import React, { Dispatch, SetStateAction } from 'react';
import { ChatHeader, ChatImage, ChatItemContainer, ChatLastMessage } from "./ChatItem.styles";
import formatDate from "../../formatDate";
import { useDispatch } from "react-redux";
import { removeGlobalUsersAC, setDialogAC } from "../../reducers/dialogReducer/dialogReducer";
import { dialogId, timestamp } from "../../../backend/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IChatItemProps {
    dialogId: dialogId,
    partnerAvatar: string,
    partnerNickname: string,
    lastMsg: string,
    lastMsgDate: timestamp | null,
    setSearch?: Dispatch<SetStateAction<boolean>>
}

const ChatItem: React.FC<IChatItemProps> = ({ setSearch, lastMsg, lastMsgDate, dialogId, partnerAvatar, partnerNickname, children}) => {
    const activeDialogId = useTypedSelector(({dialog}) => dialog?.activeDialog?.dialogId);
    const dispatch = useDispatch();
    const dialog = useTypedSelector(({dialog}) => dialog.dialogs?.get(dialogId));

    const setDialog = () => {
        if (!dialog) {
            dispatch(setDialogAC({id: +new Date(), with: partnerNickname, messages: []}));
            dispatch(removeGlobalUsersAC());
            if (setSearch) {
                setSearch(false);
            }
        }
        else {
            dispatch(setDialogAC(dialog));
        }
    }


    return (
        <ChatItemContainer className={activeDialogId === dialogId && 'active'} onClick={setDialog}>
            <ChatImage src={partnerAvatar} alt='chat image'/>
            <div style={{flex: 1, width: '1px'}}>
                <ChatHeader>
                    <h4>{partnerNickname}</h4>
                    {lastMsgDate && <span>{formatDate(lastMsgDate)}</span>}
                </ChatHeader>
                <ChatLastMessage>{lastMsg}</ChatLastMessage>
            </div>
        </ChatItemContainer>
    );
};

export default ChatItem;
