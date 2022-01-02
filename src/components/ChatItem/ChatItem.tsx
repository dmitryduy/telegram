import React, { Dispatch, SetStateAction } from 'react';
import { ChatHeader, ChatImage, ChatItemContainer, ChatLastMessage } from "./ChatItem.styles";
import formatDate from "../../formatDate";
import { useDispatch } from "react-redux";
import { fetchActiveDialog, removeGlobalUsersAC } from "../../reducers/dialogReducer/dialogReducer";
import { dialogId, phone, timestamp } from "../../../backend/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IChatItemProps {
    dialogId?: dialogId,
    partnerAvatar: string,
    partnerNickname: string,
    lastMsg: string,
    partnerPhone: phone,
    lastMsgDate: timestamp | null,
    setSearch?: Dispatch<SetStateAction<boolean>>
}

const ChatItem: React.FC<IChatItemProps> = ({
                                                partnerPhone,
                                                setSearch,
                                                lastMsg,
                                                lastMsgDate,
                                                dialogId,
                                                partnerAvatar,
                                                partnerNickname
                                            }) => {
    const activeDialogId = useTypedSelector(({dialog}) => dialog?.activeDialog?.dialogId);
    const dispatch = useDispatch();
    const existingDialog = useTypedSelector(({dialog}) => dialog.dialogs?.get(dialogId as number));

    const setDialog = () => {
        if (!existingDialog) {
            dispatch(fetchActiveDialog({
                messages: [],
                partnerNickname: partnerNickname,
                partnerPhone: partnerPhone,
                partnerAvatar: partnerAvatar,
                dialogId: null
            }));
            dispatch(removeGlobalUsersAC());
            if (setSearch) {
                setSearch(false);
            }
        } else {
            dispatch(fetchActiveDialog({...existingDialog, dialogId: dialogId as number}));
        }
    }


    return (
        <ChatItemContainer className={activeDialogId === dialogId ? 'active' : ''} onClick={setDialog}>
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
