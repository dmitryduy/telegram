import React, { Dispatch, SetStateAction } from 'react';
import { ChatHeader, ChatItemContainer, ChatLastMessage, UnreadMessages, ChatFooter } from "./ChatItem.styles";
import formatDate from "../../formatDate";
import { useDispatch } from "react-redux";
import { fetchActiveDialog, removeGlobalUsersAC } from "../../reducers/dialogReducer/dialogReducer";
import { dialogId, phone, timestamp } from "../../../backend/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";
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
                                                partnerPhone,
                                                setSearch,
                                                lastMsg,
                                                lastMsgDate,
                                                dialogId,
                                                partnerAvatar,
                                                partnerNickname,
                                                unread
                                            }) => {
    const activeDialogId = useTypedSelector(({dialog}) => dialog?.activeDialog?.dialogId);
    const userPhone = useTypedSelector(({user}) => user.phoneNumber);
    const dispatch = useDispatch();
    const existingDialog = useTypedSelector(({dialog}) => dialog.dialogs?.get(dialogId as number));

    const setDialog = () => {
        dispatch(removeGlobalUsersAC());
        if (setSearch) {
            setSearch(false);
        }
        if (!existingDialog) {
            dispatch(fetchActiveDialog({
                messages: [],
                partnerNickname: partnerNickname,
                partnerPhone: partnerPhone,
                partnerAvatar: partnerAvatar,
                dialogId: null,
                unread: 0
            }, userPhone!));
        } else {
            dispatch(fetchActiveDialog({...existingDialog, dialogId: dialogId as number}, userPhone!));
        }
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
