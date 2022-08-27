import React  from 'react';
import ChatItem from "@components/ChatItem/ChatItem";
import { useAppSelector } from "@hooks/useAppSelector";



const GlobalSearch: React.FC = () => {
    const foundedGlobalUsers = useAppSelector(({dialog}) => dialog.foundedGlobalUsers?.chatsOfGlobal!);
    return (
        <>
            {foundedGlobalUsers.map(globalUser => <ChatItem
                dialogId={globalUser.id}
                key={globalUser.partnerPhone}
                partnerAvatar={globalUser.partnerAvatar}
                partnerSurname={globalUser.partnerSurname}
                partnerName={globalUser.partnerName}
                partnerNickname={globalUser.partnerNickname}
                partnerPhone={globalUser.partnerPhone}
                lastMsg={`@${globalUser.partnerNickname}`}
            />)}
        </>
    );
};

export default GlobalSearch;
