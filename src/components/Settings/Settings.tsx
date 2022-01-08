import React  from 'react';
import { SettingsContainer, SettingsContent, SettingsHeader, UserName, UserPhone } from "./Settings.styles";
import { useDispatch } from "react-redux";
import { switchSettingsAC } from "../../reducers/settingsReducer/settingsReducer";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { beautifyPhone } from "../../beautifyPhone";
import SettingsItem from "../SettingsItem/SettingsItem";

const Settings: React.FC = () => {

    const {isShowSettings, backgroundImage} = useTypedSelector(({settings}) => settings);
    const {avatar, phoneNumber, nickname} = useTypedSelector(({user}) => user);
    const dispatch = useDispatch();
    const onCloseSettings = () => {
        dispatch(switchSettingsAC(false));
    }

    return (
        <>
            <SettingsContainer className={isShowSettings ? 'active': ''} onClick={onCloseSettings}>
            </SettingsContainer>
            <SettingsContent className={isShowSettings ? 'active': ''}>
                <SettingsHeader backgroundImage={backgroundImage}>
                    <img src={avatar!} alt="avatar"/>
                    <UserName>{nickname}</UserName>
                    <UserPhone>{beautifyPhone(phoneNumber!)}</UserPhone>
                </SettingsHeader>
                <SettingsItem text='Background' type='background'/>
            </SettingsContent>
        </>
    );
};

export default Settings;
