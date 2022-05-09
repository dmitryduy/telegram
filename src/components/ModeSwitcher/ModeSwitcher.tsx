import React, { useEffect } from 'react';
import { Switcher } from './ModeSwitcher.styles';
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import cn from "classnames";
import useLocalStorage from "@hooks/useLocalStorage";
import { toggleNightMode } from "@reducers/settingsSlice/settingsSlice";


const ModeSwitcher = () => {

    const {isNightMode} = useAppSelector(state => state.settings);
    const localStorage = useLocalStorage();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const isNight = localStorage.get<boolean>('night-mode');
        isNight && isNightMode !== isNight && dispatch(toggleNightMode());
    }, []);

    useEffect(() => {
        localStorage.set('night-mode', isNightMode);
    }, [isNightMode]);



    return (
        <Switcher className={cn({'night-mode': isNightMode})}>

        </Switcher>
    );
};

export default ModeSwitcher;
