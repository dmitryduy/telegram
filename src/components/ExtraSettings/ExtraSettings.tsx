import React, { useEffect, useRef, useState } from 'react';
import Popup from "@helpComponents/Popup/Popup";
import { switchSettings } from "@reducers/settingsSlice/settingsSlice";
import { useAppDispatch } from "@hooks/useAppSelector";
import UserInfo from "@components/ExtraSettings/UserInfo/UserInfo";
import SettingsItem from "@components/SettingsItem/SettingsItem";
import { Main, LeftSide, RightSide } from './ExtraSettings.styles';
import cn from "classnames";
import PopupTitle from "@helpComponents/PopupTitle/PopupTitle";
import InfoSettings from "@components/ExtraSettings/InfoSettings/InfoSettings";
import ChatSettings from "@components/ExtraSettings/ChatSettings/ChatSettings";

type itemTypes = 'edit-profile' | 'chat-settings';


const ExtraSettings = () => {
    const [active, setActive] = useState(false);
    const [side, setSide] = useState<'left' | 'right'>('left');
    const [currentType, setCurrentType] = useState<itemTypes | ''>('');
    const contentRef = useRef<HTMLDivElement>(null);
    const mainRef = useRef<HTMLDivElement>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.emitter.on('extra-settings-popup:hide', () => setActive(false));
        window.emitter.on('settings-popup:open', () => {
            dispatch(switchSettings(false));
            setActive(true)
        });
        window.emitter.on('extra-settings-item:click', (data: { type: itemTypes } | undefined) => {
            setCurrentType(data!.type);
            setSide('right');
        });
        window.emitter.on('go-back:click', () => {
            setSide('left');
            setCurrentType('');
        })
        return () => {
            window.emitter.un('extra-settings-item:click');
            window.emitter.un('extra-settings-popup:hide');
            window.emitter.un('settings-popup:open');
            window.emitter.un('item:click');
            window.emitter.un('go-back:click');

        };
    }, []);

    useEffect(() => {
        const content = contentRef.current;
        const main = mainRef.current;
        if (!content || !main) return;
        // 20 - padding у попапа
        content.style.minHeight = main.offsetHeight + 20 + 'px';
        content.style.maxHeight = main.offsetHeight + 20 + 'px';
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
        <Popup ref={contentRef} active={active} emitCloseName='extra-settings-popup:hide' closeButton>
            <Main ref={mainRef} className={cn({right: side === 'right'})}>
                <LeftSide className={cn({hide: side === 'right'})}>
                    <PopupTitle closePopup={closeLeftPopup} closeButton>Settings</PopupTitle>
                    <UserInfo/>
                    <SettingsItem text='Edit Profile' type='edit-profile' imgName='edit-profile' changeSide/>
                    <SettingsItem text='Chat Settings' type='chat-settings' imgName='chat-settings' changeSide/>
                </LeftSide>
                <RightSide>
                    <PopupTitle backEventName='go-back:click' closePopup={closeRightPopup} closeButton
                                backButton>Info</PopupTitle>
                    {currentType === 'edit-profile' && <InfoSettings/>}
                    {currentType === 'chat-settings' && <ChatSettings/>}
                </RightSide>
            </Main>
        </Popup>
    );
};

export default ExtraSettings;
