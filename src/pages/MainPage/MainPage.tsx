import React, { useEffect, useState } from 'react';
import ChatsSide from "../../components/ChatsSide/ChatsSide";
import MessagesSide from "../../components/MessagesSide/MessagesSide";
import useSocket from "../../hooks/useSocket";
import Settings from "../../components/Settings/Settings";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import NewMessagePopup from "../../components/NewMessagePopup/NewMessagePopup";
import { useDispatch } from "react-redux";
import { INewMessage } from "../../reducers/dialogReducer/types";
import { addNewMessageAC, sendOnlineUserAC, setOfflineUserAC } from "../../reducers/dialogReducer/dialogReducer";
import { phone, timestamp } from "../../../backend/types";
import { INewMessagePopup } from "../../globalTypes";

let newMessagePopUpTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
});

const MainPage: React.FC = () => {
    const initSocket = useSocket('joined');
    const userPhone = useTypedSelector(({user}) => user.phoneNumber);

    const newMessagePopupTime = useTypedSelector(({settings}) => settings.newMessagePopupTime)
    const newMessageSocket = useSocket('new message');
    const offlineUserSocket = useSocket('user offline');
    const onlineUserSocket = useSocket('user online');
    const dispatch = useDispatch();
    const [newMessage, setNewMessage] = useState<INewMessagePopup | null>(null);

    useEffect(() => {
        newMessageSocket.on((message: INewMessage) => {
            clearTimeout(newMessagePopUpTimer);
            setNewMessage({
                partnerAvatar: message.partnerAvatar,
                partnerNickname: message.partnerNickname,
                partnerPhone: message.partnerPhone,
                text: message.text
            })
            newMessagePopUpTimer = setTimeout(() => setNewMessage(null), newMessagePopupTime);

            dispatch(addNewMessageAC(message));
        });
        offlineUserSocket.on(({userPhone, userLastSeen}: { userPhone: phone, userLastSeen: timestamp }) => {
            dispatch(setOfflineUserAC(userPhone, userLastSeen));
        })
        onlineUserSocket.on(({userPhone}: { userPhone: phone }) => {
            dispatch(sendOnlineUserAC(userPhone));
        })
        return () => {
            newMessageSocket.off();
            offlineUserSocket.off();
            onlineUserSocket.off();
        }
    }, []);


    useEffect(() => {
        initSocket.emit(userPhone);
    }, []);


    return (
        <div style={{display: 'flex'}}>
            <NewMessagePopup newMessage={newMessage} setNewMessage={setNewMessage}/>
            <ChatsSide/>
            <MessagesSide/>
            <Settings/>
        </div>
    );
};

export default MainPage;
