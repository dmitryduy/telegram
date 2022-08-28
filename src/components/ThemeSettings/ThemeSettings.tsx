import React, { useEffect, useState } from 'react';
import { PopupItemContainer } from '@styled-components/PopupItemContainer';
import SettingsTitle from '@helpComponents/SettingsTitle/SettingsTitle';
import ThemeItem from '@components/ThemeItem/ThemeItem';
import { FlexContainer } from '@styled-components/FlexContainer';
import RadioButton from '@helpComponents/RadioButton/RadioButton';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import { setThemeColor, toggleNightMode } from '@reducers/settingsSlice/settingsSlice';
import noop from '@helpers/noop';

import { themeColor } from '../../globalTypes';

const checkboxColors = [
  '#40a7e3',
  '#45bce7',
  '#52b440',
  '#d46c99',
  '#df8a49',
  '#9978c8',
  '#c55245',
  '#687b98',
  '#dea922'];

const ThemeSettings = () => {
  const {isNightMode} = useAppSelector(state => state.settings);
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>(isNightMode ? 'dark' : 'light');
  const {themeColor} = useAppSelector(state => state.settings);
  const [currentThemeColor, setCurrentThemeColor] = useState<themeColor>(themeColor);
  const dispatch = useAppDispatch();

  const lightThemeHandle = () => {
    setSelectedTheme('light');
    dispatch(toggleNightMode(false));
  };

  const darkThemeHandle = () => {
    setSelectedTheme('dark');
    dispatch(toggleNightMode(true));
  };

  const themeColorHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentThemeColor(e.target.value as themeColor);
    dispatch(setThemeColor(e.target.value as themeColor));
    window.storage.set('theme-color', e.target.value);
  };

  useEffect(() => {
    if (isNightMode && selectedTheme !== 'dark') {
      setSelectedTheme('dark');
    } else if (!isNightMode && selectedTheme !== 'light') {
      setSelectedTheme('light');
    }
  }, [isNightMode]);


  return (
    <PopupItemContainer>
      <SettingsTitle title="Themes"/>
      <FlexContainer justify="space-between" marginBottom="10px">
        <ThemeItem
          nameColor={selectedTheme === 'light' ? themeColor : undefined}
          name="Classic"
          bgColor="#9bd494"
          myMessageColor="#ffffff"
          partnerMessageColor="#ffffff"
          onClick={lightThemeHandle}>
          <RadioButton value="light" checked={selectedTheme === 'light'} onChange={() => setSelectedTheme('light')}/>
        </ThemeItem>
        <ThemeItem
          nameColor={selectedTheme === 'dark' ? themeColor : undefined}
          name="Night"
          bgColor="#485761"
          myMessageColor="#5ca8d4"
          partnerMessageColor="#6b818d"
          onClick={darkThemeHandle}>
          <RadioButton value="dark" checked={selectedTheme === 'dark'} onChange={() => setSelectedTheme('dark')}/>
        </ThemeItem>
        <ThemeItem
          name="Soon..."
          bgColor="#7ec4ea"
          myMessageColor="#d7f0ff"
          partnerMessageColor="#ffffff"
          onClick={noop}/>
        <ThemeItem
          name="Soon..."
          bgColor="#485761"
          myMessageColor="#6b808d"
          partnerMessageColor="#6b808d"
          onClick={noop}/>
      </FlexContainer>
      <FlexContainer justify="space-between">
        {checkboxColors.map(color =>
          <RadioButton color={color}
            key={color}
            checked={color === currentThemeColor}
            value={color}
            onChange={themeColorHandler}
            filled/>
        )}
      </FlexContainer>
    </PopupItemContainer>
  );
};

export default ThemeSettings;
