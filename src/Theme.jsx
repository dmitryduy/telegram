import React from 'react'
import { ThemeProvider } from "styled-components";

const theme = {
    colors: {
        blue: '#54c3f3',
        darkBlue: '#419fd9',
        lightGray: '#f1f1f1',
        darkGray: '#9999ab',
        black: '#22224b'
    },
    fontSizes: {
        normal: '14px',
        extraNormal: '15px',
        medium: '16px'
    }
}

const Theme = ({children}) => {
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
};

export default Theme;
