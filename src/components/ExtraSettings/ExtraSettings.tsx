import React, { useEffect, useState } from 'react';
import Popup from "@helpComponents/Popup/Popup";
import { switchSettings } from "@reducers/settingsSlice/settingsSlice";
import { useAppDispatch } from "@hooks/useAppSelector";
import UserInfo from "@components/ExtraSettings/UserInfo/UserInfo";
import SettingsItem from "@components/SettingsItem/SettingsItem";
import { Main, LeftSide, RightSide } from './ExtraSettings.styles';
import cn from "classnames";
import PopupTitle from "@helpComponents/PopupTitle/PopupTitle";


const ExtraSettings = () => {
    const [active, setActive] = useState(false);
    const [side, setSide] = useState<'left' | 'right'>('left');
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.emitter.on('extra-settings-popup:hide', () => setActive(false));
        window.emitter.on('settings-popup:open', () => {
            dispatch(switchSettings(false));
            setActive(true)
        });
        window.emitter.on('go-back', () => setSide('left'))
        window.emitter.on('edit-profile-change-side:right', () => setSide('right'));
        return () => {
            window.emitter.un('extra-settings-popup:hide');
            window.emitter.un('settings-popup:open');
        };
    }, []);

    const closeLeftPopup = (e) => {
        e.stopPropagation();
        window.emitter.emit('extra-settings-popup:hide');
    }

    const closeRightPopup = (e) => {
        e.stopPropagation();
        window.emitter.emit('extra-settings-popup:hide');
        setTimeout(() =>setSide('left'), 100);
    }

    return (
        <Popup active={active} emitCloseName='extra-settings-popup:hide' closeButton>
            <Main className={cn({right: side === 'right'})}>
                <LeftSide>
                    <PopupTitle closePopup={closeLeftPopup} closeButton>Settings</PopupTitle>
                    <UserInfo/>
                    <SettingsItem text='Edit Profile' type='edit-profile' imgName='edit-profile' changeSide/></LeftSide>
                <RightSide>
                    <PopupTitle backEventName='go-back' closePopup={closeRightPopup} closeButton backButton>Info</PopupTitle>
                </RightSide>
            </Main>
        </Popup>
    );
};

export default ExtraSettings;
