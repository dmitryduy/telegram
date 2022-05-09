import React, { useEffect } from 'react';

import ChatsSide from "@components/ChatsSide/ChatsSide";
import MessagesSide from "@components/MessagesSide/MessagesSide";
import useSocket from "@hooks/useSocket";
import Settings from "@components/Settings/Settings";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import { INewMessage } from "@reducers/dialogSlice/types";
import { dialogActions } from "@reducers/dialogSlice/dialogSlice";
import SettingsPopup from "@components/SettingsPopup/SettingsPopup";
import { phone, timestamp } from "../../globalTypes";


const MainPage: React.FC = () => {
    const userPhone = useAppSelector(({user}) => user.phoneNumber);

    const initSocket = useSocket('joined');
    const newMessageSocket = useSocket('new message');
    const offlineUserSocket = useSocket('user offline');
    const onlineUserSocket = useSocket('user online');
    const dispatch = useAppDispatch();

    useEffect(() => {
        newMessageSocket.on((message: INewMessage) => {
            dispatch(dialogActions.addNewMessage(message));
        });
        offlineUserSocket.on(({userPhone, userLastSeen}: { userPhone: phone, userLastSeen: timestamp }) => {
            dispatch(dialogActions.setOfflineUser({userPhone, userLastSeen}));
        })
        onlineUserSocket.on(({userPhone}: { userPhone: phone }) => {
            dispatch(dialogActions.sendOnlineUser(userPhone));
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
