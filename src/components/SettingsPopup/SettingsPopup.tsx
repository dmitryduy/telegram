import React from 'react';
import { useAppSelector } from "@hooks/useAppSelector";
import BackgroundPopup from "@components/BackgroundPopup/BackgroundPopup";
import {PopupBackground, PopupContent} from "./SettingsPopup.styles";

const SettingsPopup = () => {
    // @ts-ignore
    const type = useAppSelector(({settings}) => settings.typeSettings);
    if (!type) {
        return null;
    }

    return (
        <PopupBackground>
            <PopupContent>
                {type === 'background' && <BackgroundPopup/>}
            </PopupContent>
        </PopupBackground>
    );
};

export default SettingsPopup;
