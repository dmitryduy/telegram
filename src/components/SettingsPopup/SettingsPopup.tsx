import React from 'react';
import { useTypedSelector } from "../../hooks/useTypedSelector";
import BackgroundPopup from "../BackgroundPopup/BackgroundPopup";
import {PopupBackground, PopupContent} from "./SettingsPopup.styles";

const SettingsPopup = () => {
    const type = useTypedSelector(({settings}) => settings.typeSettings);
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
