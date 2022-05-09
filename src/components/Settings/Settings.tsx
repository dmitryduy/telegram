import React  from 'react';

import { SettingsContainer, SettingsContent, SettingsHeader, UserName, UserPhone, Mode } from "./Settings.styles";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import { beautifyPhone } from "../../beautifyPhone";
import SettingsItem from "@components/SettingsItem/SettingsItem";
import UserAvatar from "@components/UserAvatar/UserAvatar";

import DayImage from '@images/day.png';
import NightImage from '@images/night.svg';
import { settingsActions } from "@reducers/settingsSlice/settingsSlice";

const Settings: React.FC = () => {
    const {isShowSettings, backgroundImage, mode} = useAppSelector(({settings}) => settings);
    const {avatar, phoneNumber, nickname} = useAppSelector(({user}) => user);

    const dispatch = useAppDispatch();

    const onCloseSettings = () => {
        dispatch(settingsActions.switchSettings(false));
    }

    const changeMode = () => {
      dispatch(settingsActions.changeMode());
    }

    return (
        <>
            <SettingsContainer className={isShowSettings ? 'active': ''} onClick={onCloseSettings}>
            </SettingsContainer>
            <SettingsContent className={isShowSettings ? 'active': ''}>
                <SettingsHeader backgroundImage={backgroundImage}>
                    <UserAvatar style={{marginBottom: '10px'}} image={avatar!} name={nickname!}/>
                    <UserName>{nickname}</UserName>
                    <UserPhone>{beautifyPhone(phoneNumber!)}</UserPhone>
                </SettingsHeader>
                <SettingsItem text='Background' type='background'/>
                <Mode onClick={changeMode} src={mode === 'day' ? DayImage: NightImage} alt="mode"/>
            </SettingsContent>
        </>
    );
};

export default Settings;
