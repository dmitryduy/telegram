import React, { Dispatch, SetStateAction } from 'react';
import ChatItem from "@components/ChatItem/ChatItem";
import { useAppSelector } from "@hooks/useAppSelector";

interface IGlobalSearchProps {
    setSearch: Dispatch<SetStateAction<boolean>>
}


const GlobalSearch: React.FC<IGlobalSearchProps> = ({setSearch}) => {
    const foundedGlobalUsers = useAppSelector(({dialog}) => dialog.foundedGlobalUsers?.chatsOfGlobal!);
    return (
        <>
            {foundedGlobalUsers.map(globalUser => <ChatItem
                setSearch={setSearch}
                key={globalUser.partnerPhone}
                partnerAvatar={globalUser.partnerAvatar}
                partnerNickname={globalUser.partnerNickname}
                partnerPhone={globalUser.partnerPhone}
                lastMsg={`@${globalUser.partnerNickname}`}
                lastMsgDate={null}
                unread={0}
            />)}
        </>
    );
};

export default GlobalSearch;
