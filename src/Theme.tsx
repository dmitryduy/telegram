import React from 'react'
import { ThemeProvider } from "styled-components";
import { useAppSelector } from "./hooks/useAppSelector";


const colors = {
    lightBlack: '#17212b',
    slimGray: '#e0e0e0',
    darkBlue: '#2f6ea5',
    black: '#222222',
    white: '#fff',
    gray: '#65717b',
    red: '#ef5959',
    darkGray: '#242f3d',
    lightGray: '#6c7883',
    slimBlack: '#202b36',
    lightBlue: '#2b5278',
    blue: '#4082bc',
    slimBlue: '#40a7e3',
    darkBlack: '#0e1621',
    transparent: 'transparent',
    lighterGray: '#f1f1f1',
    green: '#effdde',
};

const fontSizes = {
    small: '12px',
    extraSmall: '13px',
    normal: '14px',
    extraNormal: '15px',
    medium: '16px',
    extraMedium: '18px',
    large: '20px'
}

const lightTheme = {
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
        unreadMessage: colors.slimBlue,
        partnerMessage: colors.white,
        userMessage: colors.green,
        helpingBorders: colors.slimGray,
        imageBorder: colors.slimBlue,
        buttonDisabled: colors.lightGray,
        searchTitle: colors.lighterGray,
        dateBackground: colors.lightGray,
        unreadTitle: colors.white,
        unreadText: colors.blue
    },
    fontSizes
}

const darkTheme = {
    colors: {
        bgColor: colors.lightBlack,
        inputBackground: colors.transparent,
        inputFocusBorder: colors.darkBlue,
        button: colors.darkBlue,
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
        unreadMessage: colors.blue,
        partnerMessage: colors.lightBlack,
        userMessage: colors.lightBlue,
        helpingBorders: colors.darkBlack,
        imageBorder: colors.lightBlue,
        buttonDisabled: colors.darkGray,
        searchTitle: colors.darkGray,
        dateBackground: colors.lightBlue,
        unreadTitle: colors.darkGray,
        unreadText: colors.white
    },
    fontSizes
}

const Theme: React.FC = ({children}) => {
    // @ts-ignore
    const mode = useAppSelector(({settings}) => settings.mode);

    return (
        <ThemeProvider theme={mode === 'day' ? lightTheme : darkTheme}>
            {children}
        </ThemeProvider>
    );
};

export default Theme;
