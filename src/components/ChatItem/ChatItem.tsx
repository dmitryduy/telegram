import React  from 'react';
import { ChatHeader, ChatItemContainer, ChatLastMessage, UnreadMessages } from "./ChatItem.styles";
import formatDate from "../../formatDate";
import { phone, timestamp } from "../../globalTypes";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import UserAvatar from "@components/UserAvatar/UserAvatar";
import { FlexContainer } from '@styled-components/FlexContainer';
import getAvatarName from "@helpers/getAvatarName";
import { fetchActiveDialog, removeGlobalUsers, setActiveDialog } from "@reducers/dialogSlice/dialogSlice";

interface IChatItemProps {
    dialogId: number,
    partnerAvatar: string,
    partnerNickname: string,
    partnerName: string | null,
    partnerSurname: string | null,
    lastMsg: string,
    partnerPhone: phone,
    lastMsgDate?: timestamp | null,
    unread?: number
}

const ChatItem: React.FC<IChatItemProps> = ({
                                                partnerPhone,
                                                lastMsg,
                                                lastMsgDate,
                                                dialogId,
                                                partnerAvatar,
                                                partnerNickname,
                                                partnerName,
                                                partnerSurname,
                                                unread
                                            }) => {
    const activeDialogId = useAppSelector((state) => state.dialog.activeDialog?.id);
    const existingDialog = useAppSelector((state) => state.dialog.dialogs[dialogId]);
    const {phoneNumber} = useAppSelector(state => state.user);
    const {themeColor} = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();

    const avatarText = getAvatarName(partnerName, partnerSurname, partnerNickname);

    const setDialog = () => {
        dispatch(removeGlobalUsers());
        window.emitter.emit('global-search-value', {value: ''});
        dispatch(fetchActiveDialog({ userPhone: phoneNumber, partnerPhone: partnerPhone }))
            .unwrap()
            .then(data => {
                if (existingDialog) {
                    dispatch(setActiveDialog({...existingDialog, ...data, dialogId}));
                } else {
                    dispatch(setActiveDialog({...data, id: dialogId, partnerAvatar, partnerName, partnerSurname, partnerNickname, messages: [], unread: 0, partnerPhone}))
                }
                window.emitter.emit('active-dialog-phone:click');
            });

    }


    return (
        <ChatItemContainer themeColor={themeColor}
                           className={activeDialogId === dialogId ? 'active' : ''}
                           onClick={setDialog}>
            <UserAvatar style={{marginRight: 15}} image={partnerAvatar} text={avatarText}/>
            <div style={{flex: 1}}>
                <ChatHeader>
                    <h4>{partnerNickname}</h4>
                    {lastMsgDate && <span>{formatDate(lastMsgDate)}</span>}
                </ChatHeader>
                <FlexContainer>
                    <ChatLastMessage>{lastMsg}</ChatLastMessage>
                    {unread && <UnreadMessages color={themeColor}>{unread}</UnreadMessages>}
                </FlexContainer>
            </div>
        </ChatItemContainer>
    );
};

export default ChatItem;
