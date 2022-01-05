import React, { Dispatch, SetStateAction } from 'react';
import ChatItem from "../ChatItem/ChatItem";
import { useTypedSelector } from "../../hooks/useTypedSelector";

interface IGlobalSearchProps {
    setSearch: Dispatch<SetStateAction<boolean>>
}


const GlobalSearch: React.FC<IGlobalSearchProps> = ({setSearch}) => {
    const foundedGlobalUsers = useTypedSelector(({dialog}) => dialog.foundedGlobalUsers?.chatsOfGlobal!);
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
            />)}
        </>
    );
};

export default GlobalSearch;
