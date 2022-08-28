import React from 'react';
import { PopupItemContainer } from '@styled-components/PopupItemContainer';
import SettingsTitle from '@helpComponents/SettingsTitle/SettingsTitle';
import { FlexContainer } from '@styled-components/FlexContainer';
import { useAppSelector } from '@hooks/useAppSelector';
import { getBackgroundImagePath } from '@helpers/paths';
import ThemedText from '@helpComponents/ThemedText/ThemedText';
import popupOpen from '@helpers/popupOpen';

import { ChooseContainer, BackgroundImage } from './BackgroundSettings.styles';

const BackgroundSettings = () => {
  const { backgroundImage } = useAppSelector(state => state.settings);
  return (
    <PopupItemContainer>
      <SettingsTitle title="Chat background"/>
      <FlexContainer>
        <BackgroundImage width={80} height={80} src={getBackgroundImagePath(backgroundImage)} alt="background"/>
        <ChooseContainer>
          <ThemedText text="Choose from gallery" onClick={() => popupOpen('background')}/>
          <ThemedText text="Choose from file"/>
        </ChooseContainer>
      </FlexContainer>
    </PopupItemContainer>
  );
};

export default BackgroundSettings;
