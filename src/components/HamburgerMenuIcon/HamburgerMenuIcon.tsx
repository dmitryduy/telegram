import React from 'react';
import { useAppDispatch } from '@hooks/useAppSelector';
import { switchSettings } from '@reducers/settingsSlice/settingsSlice';

import { HamburgerContainer } from './HamburgerMenuIcon.styles';


const HamburgerMenuIcon: React.FC = () => {
  const dispatch = useAppDispatch();

  const onOpenSettings = () => {
    dispatch(switchSettings(true));
  };

  return (
    <HamburgerContainer onClick={onOpenSettings}>
      <span/><span/><span/>
    </HamburgerContainer>
  );
};

export default HamburgerMenuIcon;
