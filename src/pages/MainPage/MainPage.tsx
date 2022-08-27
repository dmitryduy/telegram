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
import ExtraSettings from "@components/ExtraSettings/ExtraSettings";
import Tooltip from "@helpComponents/Tooltip/Tooltip";
import NamePopup from "@components/NamePopup/NamePopup";
import NicknamePopup from "@components/NicknamePopup/NicknamePopup";
import BackgroundPopup from "@components/BackgroundPopup/BackgroundPopup@common";


const MainPage: React.FC = () => {
    const {phoneNumber} = useAppSelector(({user}) => user);

    const initSocket = useSocket('joined');
    const newMessageSocket = useSocket('new message');
    const offlineUserSocket = useSocket('user offline');
    const onlineUserSocket = useSocket('user online');
    const dispatch = useAppDispatch();

    useEffect(() => {
        initSocket.emit(phoneNumber);

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

    return (
        <div style={{display: 'flex', overflow: 'hidden'}}>
            <ChatsSide/>
            <MessagesSide/>
            <Settings/>
            <SettingsPopup/>
            <ExtraSettings/>
            <NamePopup/>
            <NicknamePopup/>
            <BackgroundPopup/>
            <Tooltip/>
        </div>
    );
};

export default MainPage;
