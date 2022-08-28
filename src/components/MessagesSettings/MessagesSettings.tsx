import React from 'react';
import { PopupItemContainer } from '@styled-components/PopupItemContainer';
import SettingsTitle from '@helpComponents/SettingsTitle/SettingsTitle';
import RadioButton from '@helpComponents/RadioButton/RadioButton';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import ThemedText from '@helpComponents/ThemedText/ThemedText';
import { FlexContainer } from '@styled-components/FlexContainer';
import { setHotkeyBySend } from '@reducers/settingsSlice/settingsSlice';

import { sendHotkey } from '../../globalTypes';

import { MessagesSettingsList } from './MessagesSettings.styles';

const MessagesSettings = () => {
  const {themeColor, sendHotkey} = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();

  const onChange = (value: sendHotkey) => {
    if (value !== sendHotkey) {
      window.storage.set<sendHotkey>('send-hotkey', value);
      dispatch(setHotkeyBySend(value));
    }
  };

  return (
    <PopupItemContainer>
      <SettingsTitle title="Messages"/>
      <MessagesSettingsList>
        <FlexContainer as="li" alignItems="center">
          <RadioButton
            color={themeColor}
            checked={sendHotkey === 'enter'}
            value={'enter'}
            onChange={() => onChange('enter')}
          />
          <ThemedText text="Send with Enter" onClick={() => onChange('enter')}/>
        </FlexContainer>
        <FlexContainer as="li" alignItems="center">
          <RadioButton
            color={themeColor}
            checked={sendHotkey === 'ctrl-enter'}
            value={'ctrl-enter'}
            onChange={() => onChange('ctrl-enter')}
          />
          <ThemedText text="Send with Ctrl+Enter" onClick={() => onChange('ctrl-enter')}/>
        </FlexContainer>
      </MessagesSettingsList>
    </PopupItemContainer>
  );
};

export default MessagesSettings;
