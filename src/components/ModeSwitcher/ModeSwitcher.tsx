import React from 'react';
import { Switcher } from './ModeSwitcher.styles';
import { useAppSelector } from "@hooks/useAppSelector";
import cn from "classnames";


const ModeSwitcher = () => {

    const {isNightMode} = useAppSelector(state => state.settings);

    return (
        <Switcher className={cn({'night-mode': isNightMode})}>

        </Switcher>
    );
};

export default ModeSwitcher;
