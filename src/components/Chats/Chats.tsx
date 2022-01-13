import React, { Dispatch, SetStateAction } from 'react';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { dialogId, phone, timestamp } from "../../types";
import Loading from "../Loading/Loading";
import NotFound from "../NotFound/NotFound";
import GlobalSearch from "../GlobalSearch/GlobalSearch";
import UserChats from "../UserChats/UserChats";
import ChatsTitle from "../ChatsTitle/ChatsTitle";

interface IChatsProps {
    readonly isSearch: boolean,
    readonly isLoading: boolean,
    readonly setSearch: Dispatch<SetStateAction<boolean>>
}


export interface IDialogToArray {
    readonly dialogId: dialogId,
    readonly partnerAvatar: string,
    readonly partnerNickname: string,
    readonly partnerPhone: phone,
    readonly lastMsg: string,
    readonly lastMsgDate: timestamp,
    readonly unread: number
}


const Chats: React.FC<IChatsProps> = ({isSearch, isLoading, setSearch}) => {
    const dialogs = useTypedSelector(({dialog}) => dialog.dialogs);
    const foundedGlobalUsers = useTypedSelector(({dialog}) => dialog.foundedGlobalUsers);
    const dialogsToArray: IDialogToArray[] = [];
    const userDialogsBySearch: IDialogToArray[] = [];
    dialogs?.forEach((dialog, dialogId) => {
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
    })
    if (!isSearch) {
        return <UserChats dialogsToArray={dialogsToArray}/>
    }

    if (isLoading) {
        return <Loading/>
    }


    if (foundedGlobalUsers?.chatsOfUser.length || foundedGlobalUsers?.chatsOfGlobal.length) {
        return <>
            {foundedGlobalUsers!.chatsOfUser.length ? <>
                <ChatsTitle title={`Found ${foundedGlobalUsers!.chatsOfUser.length} chats`}/>
                <UserChats dialogsToArray={userDialogsBySearch} setSearch={setSearch}/>
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
