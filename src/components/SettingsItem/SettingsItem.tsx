import React from 'react';

import { SettingsItemContainer } from './SettingsItem.styles';

import { typeOfSettings } from "@reducers/settingsSlice/types";
import { useAppDispatch } from "@hooks/useAppSelector";
import { settingsActions } from "@reducers/settingsSlice/settingsSlice";

interface ISettingsItemProps {
    text: string,
    type: typeOfSettings,
}

const SettingsItem: React.FC<ISettingsItemProps>= ({text, type}) => {
    const dispatch = useAppDispatch();

    const openPopup = () => {
        dispatch(settingsActions.setTypeOfSettings(type));
    }

    return (
        <SettingsItemContainer onClick={openPopup}>
            {text}
        </SettingsItemContainer>
    );
};

export default SettingsItem;
