import React from 'react';
import { PopupItemContainer } from '@styled-components/PopupItemContainer';
import SettingsTitle from "@helpComponents/SettingsTitle/SettingsTitle";
import RadioButton from "@helpComponents/RadioButton/RadioButton";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import ThemedText from "@helpComponents/ThemedText/ThemedText";
import { FlexContainer } from '@styled-components/FlexContainer';
import { MessagesSettingsList } from './MessagesSettings.styles';
import { setSendMessageType } from "@reducers/settingsSlice/settingsSlice";

const MessagesSettings = () => {
    const {themeColor, sendMessageBy} = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();

    const onChange = (value: 'enter' | 'ctrl-enter') => {
        if (value !== sendMessageBy) {
            window.storage.set<typeof value>('send-key', value);
            dispatch(setSendMessageType(value));
        }
    }

    return (
        <PopupItemContainer>
            <SettingsTitle title='Messages'/>
            <MessagesSettingsList>
                <FlexContainer as='li' alignItems='center'>
                    <RadioButton color={themeColor} checked={sendMessageBy === 'enter'} value={'enter'} onChange={() => onChange('enter')}/>
                    <ThemedText text='Send with Enter' onClick={() => onChange('enter')}/>
                </FlexContainer>
                <FlexContainer as='li' alignItems='center'>
                    <RadioButton color={themeColor} checked={sendMessageBy === 'ctrl-enter'} value={'ctrl-enter'} onChange={() => onChange('ctrl-enter')}/>
                    <ThemedText text='Send with Ctrl+Enter' onClick={() => onChange('ctrl-enter')}/>
                </FlexContainer>
            </MessagesSettingsList>
        </PopupItemContainer>
    );
};

export default MessagesSettings;
