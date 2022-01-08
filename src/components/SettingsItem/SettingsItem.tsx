import React from 'react';
import { SettingsItemContainer } from './SettingsItem.styles';
import { typeOfSettings } from "../../reducers/settingsReducer/types";
import { useDispatch } from "react-redux";
import { setTypeOfSettings } from "../../reducers/settingsReducer/settingsReducer";

interface ISettingsItemProps {
    text: string,
    type: typeOfSettings,
}

const SettingsItem: React.FC<ISettingsItemProps>= ({text, type}) => {
    const dispatch = useDispatch();

    const openPopup = () => {
        dispatch(setTypeOfSettings(type));
    }

    return (
        <SettingsItemContainer onClick={openPopup}>
            {text}
        </SettingsItemContainer>
    );
};

export default SettingsItem;
