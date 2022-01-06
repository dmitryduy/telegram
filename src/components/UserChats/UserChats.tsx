import React, { Dispatch, SetStateAction } from 'react';
import ChatItem from "../ChatItem/ChatItem";
import { IDialogToArray } from "../Chats/Chats";

const UserChats = ({dialogsToArray, setSearch}: {dialogsToArray: IDialogToArray[], setSearch?: Dispatch<SetStateAction<boolean>>}) => {
    return (
        <>
            {dialogsToArray.sort((a, b) => b.lastMsgDate - a.lastMsgDate).map(dialog => <ChatItem
                dialogId={dialog.dialogId}
                key={dialog.dialogId}
                partnerAvatar={dialog.partnerAvatar}
                partnerNickname={dialog.partnerNickname}
                partnerPhone={dialog.partnerPhone}
                lastMsg={dialog.lastMsg}
                lastMsgDate={dialog.lastMsgDate}
                unread={dialog.unread}
                setSearch={setSearch}
            />)}
        </>
    );
};

export default UserChats;
