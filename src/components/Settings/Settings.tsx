import React  from 'react';
import { SettingsContainer, SettingsContent, SettingsHeader, UserName, UserPhone } from "./Settings.styles";
import { useDispatch } from "react-redux";
import { switchSettingsAC } from "../../reducers/settingsReducer/settingsReducer";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Settings: React.FC = () => {

    const isShow = useTypedSelector(({settings}) => settings.isShowSettings);
    const {avatar, phoneNumber, nickname} = useTypedSelector(({user}) => user);
    const dispatch = useDispatch();
    const onCloseSettings = () => {
        dispatch(switchSettingsAC(false));
    }

    return (
        <>
            <SettingsContainer className={isShow ? 'active': ''} onClick={onCloseSettings}>
            </SettingsContainer>
            <SettingsContent className={isShow ? 'active': ''}>
                <SettingsHeader>
                    <img src={avatar!} alt="avatar"/>
                    <UserName>{nickname}</UserName>
                    <UserPhone>{phoneNumber}</UserPhone>
                </SettingsHeader>
            </SettingsContent>
        </>
    );
};

export default Settings;
