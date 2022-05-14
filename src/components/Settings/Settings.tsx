import React from 'react';

import { SettingsContainer, SettingsContent, SettingsHeader } from "./Settings.styles";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";

import { getSideItems } from "@components/Settings/helpers";
import { switchSettings, toggleNightMode } from "@reducers/settingsSlice/settingsSlice";
import User from "@helpComponents/User/User";
import ListItem from "@helpComponents/ListItem/ListItem";
import popupOpen from "@helpers/popupOpen";
import ModeSwitcher from "@components/ModeSwitcher/ModeSwitcher";

const Settings: React.FC = () => {
    const {isShowSettings, backgroundImage} = useAppSelector(state => state.settings);

    const dispatch = useAppDispatch();

    const onCloseSettings = () => {
        dispatch(switchSettings(false));
    }

    const changeMode = () => {
        dispatch(toggleNightMode());
    }

    return (
        <>
            <SettingsContainer className={isShowSettings ? 'active' : ''} onClick={onCloseSettings}>
            </SettingsContainer>
            <SettingsContent className={isShowSettings ? 'active' : ''}>
                <SettingsHeader backgroundImage={backgroundImage}>
                    <User avatarPos='avatar-top' styleContainer={{padding: "20px 25px 10px"}} phone/>
                </SettingsHeader>
                {getSideItems().map(item => <ListItem key={item.text} text={item.text} imgName={item.imgName}
                                                      RightItem={item.type === 'night-mode'? <ModeSwitcher/> : null}
                                                      onClick={() => item.type === 'night-mode' ? changeMode() : popupOpen(item.type)}/>)}
            </SettingsContent>
        </>
    );
};

export default Settings;
