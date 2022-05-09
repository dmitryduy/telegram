import React, { useEffect, useState } from 'react';

import { SettingsItemContainer } from './SettingsItem.styles';

import { typeOfSettings } from "@reducers/settingsSlice/types";
import { useAppDispatch } from "@hooks/useAppSelector";
import { setTypeOfSettings, toggleNightMode } from "@reducers/settingsSlice/settingsSlice";
import ModeSwitcher from "@components/ModeSwitcher/ModeSwitcher";

interface ISettingsItemProps {
    text: string,
    type: typeOfSettings,
    imgName?: string
}

const SettingsItem: React.FC<ISettingsItemProps> = ({imgName, text, type}) => {
    const dispatch = useAppDispatch();
    const [image, setImage] = useState('');
    useEffect(() => {
        import(`@images/side-menu/${imgName}.png`).then(image => setImage(image.default));
    }, []);


    const openPopup = () => {
        if (type === 'night-mode') {
            dispatch(toggleNightMode());
            return;
        }
        dispatch(setTypeOfSettings(type));
    }

    return (
        <SettingsItemContainer onClick={openPopup}>
            <img width={24} height={24} src={image} alt=""/>
            {text}
            {type === 'night-mode' && <ModeSwitcher/>}
        </SettingsItemContainer>
    );
};

export default SettingsItem;
