import React, { Dispatch, SetStateAction } from 'react';

import { useAppSelector } from "@hooks/useAppSelector";
import { dialogId, phone, timestamp } from "../../globalTypes";
import Loading from "@components/Loading/Loading";
import NotFound from "@components/NotFound/NotFound";
import GlobalSearch from "@components/GlobalSearch/GlobalSearch";
import UserChats from "@components/UserChats/UserChats";
import ChatsTitle from "@components/ChatsTitle/ChatsTitle";

interface IChatsProps {
    isSearch: boolean,
    isLoading: boolean,
    setSearch: Dispatch<SetStateAction<boolean>>
}


export interface IDialogToArray {
    dialogId: dialogId,
    partnerAvatar: string,
    partnerNickname: string,
    partnerPhone: phone,
    lastMsg: string,
    lastMsgDate: timestamp,
    unread: number
}


const Chats: React.FC<IChatsProps> = ({isSearch, isLoading, setSearch}) => {
    const dialogs = useAppSelector(({dialog}) => dialog.dialogs);
    const foundedGlobalUsers = useAppSelector(({dialog}) => dialog.foundedGlobalUsers);

    const dialogsToArray: IDialogToArray[] = [];
    const userDialogsBySearch: IDialogToArray[] = [];

    for (let dialogId in dialogs) {
        const dialog = dialogs[dialogId];
        const dialogItem: IDialogToArray = {
            dialogId: dialogId,
            partnerAvatar: dialog.partnerAvatar,
            partnerNickname: dialog.partnerNickname,
            partnerPhone: dialog.partnerPhone,
            lastMsg: dialog.messages[dialog.messages.length - 1].text,
            lastMsgDate: dialog.messages[dialog.messages.length - 1].createDate,
            unread: dialog.unread
        }
        dialogsToArray.push(dialogItem);
        if (foundedGlobalUsers?.chatsOfUser.includes(dialogId)) {
            userDialogsBySearch.push(dialogItem);
        }
    }

    if (!isSearch) return <UserChats/>

    if (isLoading) return <Loading/>

    if (foundedGlobalUsers?.chatsOfUser.length || foundedGlobalUsers?.chatsOfGlobal.length) {
        return <>
            {foundedGlobalUsers!.chatsOfUser.length ? <>
                <ChatsTitle title={`Found ${foundedGlobalUsers!.chatsOfUser.length} chats`}/>
             {/*   <UserChats dialogsToArray={userDialogsBySearch} setSearch={setSearch}/>*/}
            </> : null}
            {foundedGlobalUsers!.chatsOfGlobal.length ? <>
                <ChatsTitle title='Global search results'/>
                <GlobalSearch setSearch={setSearch}/>
            </> : null}
        </>

    }

    return <NotFound/>
};

export default Chats;
