import React from 'react';
import { useAppDispatch } from '@hooks/useAppSelector';
import { switchSettings } from '@reducers/settingsSlice/settingsSlice';

import { HamburgerContainerIconStyled } from './HamburgerMenuIcon.styles';


const HamburgerMenuIcon: React.FC = () => {
  const dispatch = useAppDispatch();

  const onOpenSettings = () => {
    dispatch(switchSettings(true));
  };

  return (
    <HamburgerContainerIconStyled onClick={onOpenSettings}>
      <span/>
      <span/>
      <span/>
    </HamburgerContainerIconStyled>
  );
};

export default HamburgerMenuIcon;
