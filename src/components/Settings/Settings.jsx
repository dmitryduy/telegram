import React, { useRef } from 'react';
import { SettingsContainer, SettingsContent, SettingsHeader, UserName, UserPhone } from "./Settings.styles";
import { useDispatch, useSelector } from "react-redux";
import { switchSettingsAC } from "../../reducers/settingsReducer";

const Settings = () => {

    const isShow = useSelector(({settings}) => settings.isShowSettings);
    const {avatar, phoneNumber, nickname} = useSelector(({user}) => user);
    const dispatch = useDispatch();
    const onCloseSettings = (e) => {
        dispatch(switchSettingsAC(false));
    }

    return (
        <>
            <SettingsContainer className={isShow && 'active'} onClick={onCloseSettings}>
            </SettingsContainer>
            <SettingsContent className={isShow && 'active'}>
                <SettingsHeader>
                    <img src={avatar} alt="avatar"/>
                    <UserName>{nickname}</UserName>
                    <UserPhone>{phoneNumber}</UserPhone>
                </SettingsHeader>
            </SettingsContent>
        </>
    );
};

export default Settings;
