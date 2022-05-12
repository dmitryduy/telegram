import React, { useEffect, useRef, useState } from 'react';
import Popup from "@helpComponents/Popup/Popup";
import { switchSettings } from "@reducers/settingsSlice/settingsSlice";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import SettingsItem from "@components/SettingsItem/SettingsItem";
import { Main, LeftSide, RightSide, Items } from './ExtraSettings.styles';
import cn from "classnames";
import PopupTitle from "@helpComponents/PopupTitle/PopupTitle";
import InfoSettings from "@components/ExtraSettings/InfoSettings/InfoSettings";
import ChatSettings from "@components/ExtraSettings/ChatSettings/ChatSettings";
import User from "@helpComponents/User/User";
import copyNickname from "@components/ExtraSettings/helpers/copyNickname";
import usePopup from "@hooks/usePopup";
import HideByCondition from "@helpComponents/HideByCondition/HideByCondition";

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
            // 20 - padding у попапа
            content.style.minHeight = main.offsetHeight + 20 + 'px';
            content.style.maxHeight = main.offsetHeight + 20 + 'px';
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

    const closeLeftPopup = (e) => {
        e.stopPropagation();
        window.emitter.emit('extra-settings-popup:hide');
    }

    const closeRightPopup = (e) => {
        e.stopPropagation();
        window.emitter.emit('extra-settings-popup:hide');
        setSide('left');
        setCurrentType('');
    }

    return (
        <Popup ref={contentRef} active={active} emitCloseName={emitCloseName} closeButton>
            <Main ref={mainRef} className={cn({right: side === 'right'})}>
                <LeftSide className={cn({hide: side === 'right'})}>
                    <PopupTitle closePopup={closeLeftPopup} closeButton>Settings</PopupTitle>
                    <User styleAvatar={{height: 80, width: 80, fontSize: 25}} styleContainer={{padding: "10px 20px"}}
                          avatarPos='avatar-left' onNicknameClick={() => copyNickname(nickname || '')} nickname phone/>
                    <Items>
                        <SettingsItem text='Edit Profile' type='edit-profile' imgName='edit-profile' changeSide/>
                        <SettingsItem text='Chat Settings' type='chat-settings' imgName='chat-settings' changeSide/>
                    </Items>
                </LeftSide>
                <RightSide>
                    <PopupTitle backEventName='go-back:click' closePopup={closeRightPopup} closeButton
                                backButton>{titleName[currentType]}</PopupTitle>
                    <HideByCondition hide={currentType !== 'edit-profile'}>
                        <InfoSettings/>
                    </HideByCondition>
                    <HideByCondition hide={currentType !== 'chat-settings'}>
                        <ChatSettings/>
                    </HideByCondition>
                </RightSide>
            </Main>
        </Popup>
    );
};

export default ExtraSettings;
