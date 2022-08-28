import React, { useEffect, useRef, useState } from 'react';
import Popup from "../../shared/Popup/Popup";
import { switchSettings } from "@reducers/settingsSlice/settingsSlice";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import { Main, LeftSide, RightSide, Items } from './ExtraSettings.styles';
import cn from "classnames";
import InfoSettings from "@components/ExtraSettings/InfoSettings/InfoSettings";
import ChatSettings from "@components/ExtraSettings/ChatSettings/ChatSettings";
import User from "@helpComponents/User/User";
import copyNickname from "@components/ExtraSettings/helpers/copyNickname";
import usePopup from "@hooks/usePopup";
import HideByCondition from "@helpComponents/HideByCondition/HideByCondition";
import ListItem from "@helpComponents/ListItem/ListItem";

type itemTypes = 'edit-profile' | 'chat-settings';

const titleName: Record<itemTypes, string> = {
  'edit-profile': 'Info',
  'chat-settings': 'Chat settings'
}


const ExtraSettings = () => {
  const [active, , emitCloseName] = usePopup('extra-settings', () => {
    dispatch(switchSettings(false));
  }, () => {
    setSide('left');
    setCurrentType('');
  });
  const [side, setSide] = useState<'left' | 'right'>('left');
  const [currentType, setCurrentType] = useState<itemTypes | ''>('');
  const contentRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const nickname = useAppSelector(state => state.user.nickname);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.emitter.on('extra-settings-item:click', (data: { type: itemTypes } | undefined) => {
      setCurrentType(data!.type);
      setSide('right');
    });
    window.emitter.on('go-back:click', () => {
      setSide('left');
      setCurrentType('');
    })
    window.emitter.on('popup:resize', () => {
      const content = contentRef.current;
      const main = mainRef.current;
      if (!content || !main) return;
      content.style.minHeight = main.offsetHeight + 'px';
      content.style.maxHeight = main.offsetHeight + 'px';
    })
    return () => {
      window.emitter.un('extra-settings-item:click');
      window.emitter.un('item:click');
      window.emitter.un('go-back:click');

    };
  }, []);

  useEffect(() => {
    window.emitter.emit('popup:resize');
  }, [side]);


  return (
    <Popup ref={contentRef} active={active} emitCloseName={emitCloseName}>
      <Main ref={mainRef} className={cn({right: side === 'right'})}>
          <LeftSide className={cn({hide: side === 'right'})}>
            <Popup.Header title='Settings' closeButton moreButton/>
            <Popup.Content>
            <User styleAvatar={{height: 80, width: 80, fontSize: 25}} styleContainer={{padding: "10px 20px"}}
                  avatarPos='avatar-left' onNicknameClick={() => copyNickname(nickname || '')} nickname phone/>
            <Items>
              <ListItem text='Edit Profile' imgName='edit-profile'
                        onClick={() => window.emitter.emit('extra-settings-item:click', {type: 'edit-profile'})}/>
              <ListItem text='Chat Settings' imgName='chat-settings'
                        onClick={() => window.emitter.emit('extra-settings-item:click', {type: 'chat-settings'})}/>
            </Items>
              </Popup.Content>
          </LeftSide>
          <RightSide>
            <Popup.Header title={titleName[currentType]} backEmitName='go-back:click' closeButton backButton/>
            <Popup.Content bordered>
              <HideByCondition hide={currentType !== 'edit-profile'}>
                <InfoSettings/>
              </HideByCondition>
              <HideByCondition hide={currentType !== 'chat-settings'}>
                <ChatSettings/>
              </HideByCondition>
            </Popup.Content>
          </RightSide>
      </Main>
    </Popup>
);
};

export default ExtraSettings;
