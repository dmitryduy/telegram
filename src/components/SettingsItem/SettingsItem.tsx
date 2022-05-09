import React, { useEffect, useState } from 'react';

import { SettingsItemContainer } from './SettingsItem.styles';

import { typeOfSettings } from "@reducers/settingsSlice/types";
import { useAppDispatch } from "@hooks/useAppSelector";
import { settingsActions } from "@reducers/settingsSlice/settingsSlice";

interface ISettingsItemProps {
    text: string,
    type: typeOfSettings,
    imgName?: string
}

const SettingsItem: React.FC<ISettingsItemProps>= ({imgName, text, type}) => {
    const dispatch = useAppDispatch();
    const [image, setImage] = useState('');
    useEffect( () => {
         import(`@images/side-menu/${imgName}.png`).then(image => setImage(image.default));
    }, []);


    const openPopup = () => {
        dispatch(settingsActions.setTypeOfSettings(type));
    }

    return (
        <SettingsItemContainer onClick={openPopup}>
            <img width={24} height={24} src={image} alt=""/>
            {text}
        </SettingsItemContainer>
    );
};

export default SettingsItem;
