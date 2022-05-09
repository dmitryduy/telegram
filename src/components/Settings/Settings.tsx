import React from 'react';

import { SettingsContainer, SettingsContent, SettingsHeader, UserName, UserPhone } from "./Settings.styles";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import { beautifyPhone } from "../../beautifyPhone";
import SettingsItem from "@components/SettingsItem/SettingsItem";
import UserAvatar from "@components/UserAvatar/UserAvatar";

import { getSideItems } from "@components/Settings/helpers";
import { switchSettings } from "@reducers/settingsSlice/settingsSlice";

const Settings: React.FC = () => {
    const {isShowSettings, backgroundImage} = useAppSelector(state => state.settings);
    const {avatar, phoneNumber, nickname} = useAppSelector(state => state.user);

    const dispatch = useAppDispatch();

    const onCloseSettings = () => {
        dispatch(switchSettings(false));
    }

    return (
        <>
            <SettingsContainer className={isShowSettings ? 'active' : ''} onClick={onCloseSettings}>
            </SettingsContainer>
            <SettingsContent className={isShowSettings ? 'active' : ''}>
                <SettingsHeader backgroundImage={backgroundImage}>
                    <UserAvatar style={{marginBottom: '10px'}} image={avatar!} name={nickname!}/>
                    <UserName>{nickname}</UserName>
                    <UserPhone>{beautifyPhone(phoneNumber!)}</UserPhone>
                </SettingsHeader>
                {getSideItems().map(item => <SettingsItem key={item.text} text={item.text} type={item.type} imgName={item.imgName}/>)}
                <SettingsItem text='Background' type='background'/>
            </SettingsContent>
        </>
    );
};

export default Settings;
