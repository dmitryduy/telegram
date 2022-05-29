import React, { Dispatch, SetStateAction } from 'react';
import ChatItem from "@components/ChatItem/ChatItem";
import { useAppSelector } from "@hooks/useAppSelector";
import dialogsToArray from "@helpers/dialogsToArray";
import getLastMessageDate from "@helpers/getLastMessageDate";
import getLastMessageText from "@helpers/getLastMessageText";

const UserChats = ({setSearch}: { setSearch?: Dispatch<SetStateAction<boolean>> }) => {
    const {dialogs} = useAppSelector(state => state.dialog);

    return (
        <>
            {dialogsToArray(dialogs)
                .sort((a, b) => getLastMessageDate(b) - getLastMessageDate(a))
                .map(dialog =>
                    <ChatItem
                        dialogId={dialog.id}
                        key={dialog.id}
                        partnerAvatar={dialog.partnerAvatar}
                        partnerNickname={dialog.partnerNickname}
                        partnerPhone={dialog.partnerPhone}
                        lastMsg={getLastMessageText(dialog)}
                        lastMsgDate={getLastMessageDate(dialog)}
                        unread={dialog.unread}
                        setSearch={setSearch}
                    />)}
        </>
    );
};

export default UserChats;
