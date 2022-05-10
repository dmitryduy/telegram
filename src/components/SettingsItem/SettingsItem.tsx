import React, { useEffect, useState } from 'react';

import { SettingsItemContainer } from './SettingsItem.styles';

import { typeOfSettings } from "@reducers/settingsSlice/types";
import { useAppDispatch } from "@hooks/useAppSelector";
import { toggleNightMode } from "@reducers/settingsSlice/settingsSlice";
import ModeSwitcher from "@components/ModeSwitcher/ModeSwitcher";

interface ISettingsItemProps {
    text: string,
    type: typeOfSettings,
    imgName?: string,
    changeSide?: boolean
}

const SettingsItem: React.FC<ISettingsItemProps> = ({changeSide,imgName, text, type}) => {
    const dispatch = useAppDispatch();
    const [image, setImage] = useState('');
    useEffect(() => {
        import(`@images/side-menu/${imgName}.png`).then(image => setImage(image.default));
    }, []);


    const openPopup = () => {
        if (changeSide) {
            window.emitter.emit('extra-settings-item:click', {type});
            return;
        }

        if (type === 'night-mode') {
            dispatch(toggleNightMode());
            return;
        }
        window.emitter.emit(type + '-popup:open')
    }

    return (
        <SettingsItemContainer onClick={openPopup}>
            <img width={24} height={24} src={image} alt={imgName}/>
            {text}
            {type === 'night-mode' && <ModeSwitcher/>}
        </SettingsItemContainer>
    );
};

export default SettingsItem;
