import React from 'react';
import ChatItem from "@components/ChatItem/ChatItem";
import { useAppSelector } from "@hooks/useAppSelector";
import dialogsToArray from "@helpers/dialogsToArray";
import getLastMessageDate from "@helpers/getLastMessageDate";
import getLastMessageText from "@helpers/getLastMessageText";

const UserChats = () => {
    const {dialogs} = useAppSelector(state => state.dialog);
    console.log(dialogs)
    return (
        <>
            {dialogsToArray(dialogs)
                .sort((a, b) => getLastMessageDate(b) - getLastMessageDate(a))
                .map(dialog =>
                    <ChatItem
                        dialogId={+dialog.id}
                        key={dialog.id}
                        partnerAvatar={dialog.partnerAvatar}
                        partnerNickname={dialog.partnerNickname}
                        partnerPhone={dialog.partnerPhone}
                        partnerName={dialog.partnerName}
                        partnerSurname={dialog.partnerSurname}
                        lastMsg={getLastMessageText(dialog)}
                        lastMsgDate={getLastMessageDate(dialog)}
                        unread={dialog.unread}
                    />)}
        </>
    );
};

export default UserChats;
