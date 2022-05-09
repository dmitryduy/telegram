import React, { useEffect, useState } from 'react';
import Popup from "@helpComponents/Popup/Popup";
import { switchSettings } from "@reducers/settingsSlice/settingsSlice";
import { useAppDispatch } from "@hooks/useAppSelector";
import UserInfo from "@components/ExtraSettings/UserInfo/UserInfo";

const ExtraSettings = () => {
    const [active, setActive] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.emitter.on('extra-settings-popup:hide', () => setActive(false));
        window.emitter.on('settings-popup:open', () => {
            dispatch(switchSettings(false));
            setActive(true)
        });
        return () => {
            window.emitter.un('extra-settings-popup:hide');
            window.emitter.un('settings-popup:open');
        };
    }, []);


    return (
        <Popup active={active} title="Settings" emitCloseName='extra-settings-popup:hide' closeButton>
            <div>
                <UserInfo/>
            </div>
        </Popup>
    );
};

export default ExtraSettings;
