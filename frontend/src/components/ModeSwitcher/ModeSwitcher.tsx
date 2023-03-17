import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import cn from 'classnames';
import { toggleNightMode } from '@reducers/settingsSlice/settingsSlice';

import { Switcher } from './ModeSwitcher.styles';


const ModeSwitcher = () => {

  const {isNightMode} = useAppSelector(state => state.settings);
  const {themeColor} = useAppSelector(state => state.settings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const isNight = window.storage.get<boolean>('night-mode');
    isNight && isNightMode !== isNight && dispatch(toggleNightMode());
  }, []);

  useEffect(() => {
    window.storage.set('night-mode', isNightMode);
  }, [isNightMode]);

  return <Switcher color={themeColor} className={cn({'night-mode': isNightMode})}/>;
};

export default ModeSwitcher;
