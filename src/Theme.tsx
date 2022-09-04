import React from 'react';
import { ThemeProvider } from 'styled-components';

// без алиаса, чтобы сторибук не ругался
import { useAppSelector } from '../src/hooks/useAppSelector';


const colors = {
  lightBlack: '#282e33',
  slimGray: '#e7e7e7',
  darkBlue: '#2f6ea5',
  black: '#222222',
  white: '#ffffff',
  gray: '#65717b',
  red: '#ef5959',
  darkGray: '#242f3d',
  lightGray: '#6c7883',
  slimBlack: '#313b43',
  lightBlue: '#2b5278',
  blue: '#4082bc',
  slimBlue: '#40a7e3',
  darkBlack: '#242a2e',
  transparent: 'transparent',
  lighterGray: '#f1f1f1',
  green: '#effdde',
  mediumGray: '#e5e5e5',
  darkerGray: '#9a9a9a',
  lgray: '#999999',
  darkGreen: '#3ee2cc',
  success: '#4ab44a',
  scrollbar: '#3e4348',
  thumb: '#7d8084'
};

const fontSizes = {
  small: '12px',
  extraSmall: '13px',
  normal: '14px',
  extraNormal: '15px',
  medium: '16px',
  extraMedium: '18px',
  large: '20px'
};

const other = {
  borderRadius: '10px',
  transitionSpeed: '.2s',
  transitionSpeedSlow: '.3s',
  popupSidePadding: '15px'
};

export const lightTheme = {
  colors: {
    bgColor: colors.white,
    inputBackground: colors.white,
    inputFocusBorder: colors.slimBlue,
    button: colors.slimBlue,
    heading: colors.black,
    inputBorder: colors.slimGray,
    paragraph: colors.lightGray,
    error: colors.red,
    inputColor: colors.black,
    searchInputBackground: colors.lighterGray,
    searchInputBackgroundActive: colors.white,
    searchInputBorder: colors.blue,
    hamburger: colors.lightGray,
    hamburgerHover: colors.black,
    chatItemHover: colors.lighterGray,
    chatItemActive: colors.slimBlue,
    partnerMessage: colors.white,
    userMessage: colors.green,
    helpingBorders: colors.slimGray,
    imageBorder: colors.slimBlue,
    buttonDisabled: colors.lightGray,
    searchTitle: colors.lighterGray,
    dateBackground: colors.lightGray,
    unreadTitle: colors.white,
    unreadText: colors.blue,
    searchIcon: colors.gray,
    placeholder: colors.lightGray,
    scrollbar: colors.mediumGray,
    thumb: colors.darkerGray,
    switcher: colors.lgray,
    switcherTumbler: colors.white,
    tooltip: colors.lightBlack,
    popupBg: colors.lighterGray,
    success: colors.success,
    timeTooltipBorder: '#beb4b0',
    icons: colors.lgray,
    border: colors.slimGray,
    darkBlue: colors.darkBlue
  },
  fontSizes,
  other
};

export const darkTheme = {
  colors: {
    bgColor: colors.lightBlack,
    inputBackground: colors.transparent,
    inputFocusBorder: colors.darkGreen,
    button: colors.darkGreen,
    heading: colors.white,
    inputBorder: colors.gray,
    paragraph: colors.gray,
    error: colors.red,
    inputColor: colors.white,
    searchInputBackground: colors.darkGray,
    searchInputBackgroundActive: colors.darkGray,
    searchInputBorder: colors.transparent,
    hamburger: colors.lightGray,
    hamburgerHover: colors.white,
    chatItemHover: colors.slimBlack,
    chatItemActive: colors.lightBlue,
    partnerMessage: colors.lightBlack,
    userMessage: colors.lightBlue,
    helpingBorders: colors.slimBlack,
    imageBorder: colors.lightBlue,
    buttonDisabled: colors.darkGray,
    searchTitle: colors.darkGray,
    dateBackground: colors.lightBlue,
    unreadTitle: colors.darkGray,
    unreadText: colors.white,
    searchIcon: colors.gray,
    placeholder: colors.lightGray,
    scrollbar: colors.scrollbar,
    thumb: colors.thumb,
    switcher: colors.slimBlue,
    switcherTumbler: colors.lightBlack,
    tooltip: colors.black,
    popupBg: colors.slimBlack,
    success: colors.success,
    timeTooltipBorder: colors.slimBlack,
    icons: '#666',
    border: colors.gray,
    darkBlue: colors.darkBlue
  },
  fontSizes,
  other
};

const Theme: React.FC = ({children}) => {
  const isNightMode = useAppSelector(state => state.settings.isNightMode);

  return (
    <ThemeProvider theme={isNightMode ? darkTheme : lightTheme}>
      {children}
    </ThemeProvider>
  );
};

export default Theme;
