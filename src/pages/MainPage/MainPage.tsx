import React, { useEffect } from 'react';
import ChatsSide from "../../components/ChatsSide/ChatsSide";
import MessagesSide from "../../components/MessagesSide/MessagesSide";
import useSocket from "../../hooks/useSocket";
import Settings from "../../components/Settings/Settings";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { INewMessage } from "../../reducers/dialogReducer/types";
import { addNewMessageAC, sendOnlineUserAC, setOfflineUserAC } from "../../reducers/dialogReducer/dialogReducer";
import { phone, timestamp } from "../../types";
import SettingsPopup from "../../components/SettingsPopup/SettingsPopup";


const MainPage: React.FC = () => {
    const initSocket = useSocket('joined');
    const userPhone = useTypedSelector(({user}) => user.phoneNumber);
    const newMessageSocket = useSocket('new message');
    const offlineUserSocket = useSocket('user offline');
    const onlineUserSocket = useSocket('user online');
    const dispatch = useDispatch();

    useEffect(() => {
        newMessageSocket.on((message: INewMessage) => {
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
            <ChatsSide/>
            <MessagesSide/>
            <Settings/>
            <SettingsPopup/>
        </div>
    );
};

export default MainPage;
