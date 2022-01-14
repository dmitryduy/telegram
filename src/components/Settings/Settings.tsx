import React  from 'react';
import { SettingsContainer, SettingsContent, SettingsHeader, UserName, UserPhone, Mode } from "./Settings.styles";
import { useDispatch } from "react-redux";
import { changeModeAC, switchSettingsAC } from "../../reducers/settingsReducer/settingsReducer";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { beautifyPhone } from "../../beautifyPhone";
import SettingsItem from "../SettingsItem/SettingsItem";
import UserAvatar from "../UserAvatar/UserAvatar";

import DayImage from '../../assets/imgs/day.png';
import NightImage from '../../assets/imgs/night.svg';

const Settings: React.FC = () => {

    const {isShowSettings, backgroundImage, mode} = useTypedSelector(({settings}) => settings);
    const {avatar, phoneNumber, nickname} = useTypedSelector(({user}) => user);
    const dispatch = useDispatch();
    const onCloseSettings = () => {
        dispatch(switchSettingsAC(false));
    }

    const changeMode = () => {
      dispatch(changeModeAC());
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
