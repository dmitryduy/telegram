import React from 'react';

import { SettingsContainer, SettingsContent, SettingsHeader } from "./Settings.styles";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import SettingsItem from "@components/SettingsItem/SettingsItem";

import { getSideItems } from "@components/Settings/helpers";
import { switchSettings } from "@reducers/settingsSlice/settingsSlice";
import User from "@helpComponents/User/User";

const Settings: React.FC = () => {
    const {isShowSettings, backgroundImage} = useAppSelector(state => state.settings);

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
                    <User avatarPos='avatar-top' styleContainer={{padding: "20px 25px 10px"}} phone/>
                </SettingsHeader>
                {getSideItems().map(item => <SettingsItem key={item.text} text={item.text} type={item.type} imgName={item.imgName}/>)}
                <SettingsItem text='Background' type='background'/>
            </SettingsContent>
        </>
    );
};

export default Settings;
