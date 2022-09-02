import React, { useEffect } from 'react';
import ChatsSide from '@components/ChatsSide/ChatsSide';
import MessagesSide from '@components/MessagesSide/MessagesSide';
import useSocket from '@hooks/useSocket';
import Settings from '@components/Settings/Settings';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import { dialogActions } from '@reducers/dialogSlice/dialogSlice';
import ExtraSettings from '@components/ExtraSettings/ExtraSettings';
import Tooltip from '@helpComponents/Tooltip/Tooltip';
import NamePopup from '@components/NamePopup/NamePopup';
import NicknamePopup from '@components/NicknamePopup/NicknamePopup';
import BackgroundPopup from '@components/BackgroundPopup/BackgroundPopup@common';

import { phone, timestamp } from '../../global.typings';

import { MainPageStyled } from './MainPage.styles';


const MainPage: React.FC = () => {
  const {phoneNumber} = useAppSelector(state => state.user);

  const initSocket = useSocket('joined');
  const newMessageSocket = useSocket('new message');
  const offlineUserSocket = useSocket('user offline');
  const onlineUserSocket = useSocket('user online');

  const dispatch = useAppDispatch();

  useEffect(() => {
    initSocket.emit(phoneNumber);

    newMessageSocket.on((/*message: INewMessage*/) => {
      /*dispatch(dialogActions.addNewMessage(message));*/
    });
    offlineUserSocket.on(({userPhone, userLastSeen}: { userPhone: phone, userLastSeen: timestamp }) => {
      dispatch(dialogActions.setOfflineUser({userPhone, userLastSeen}));
    });
    onlineUserSocket.on(({userPhone}: { userPhone: phone }) => {
      dispatch(dialogActions.sendOnlineUser(userPhone));
    });
    return () => {
      initSocket.off();
      newMessageSocket.off();
      offlineUserSocket.off();
      onlineUserSocket.off();
    };
  }, []);

  return (
    <MainPageStyled>
      <ChatsSide/>
      <MessagesSide/>
      <Settings/>
      <ExtraSettings/>
      <NamePopup/>
      <NicknamePopup/>
      <BackgroundPopup/>
      <Tooltip/>
    </MainPageStyled>
  );
};

export default MainPage;
