import React, { FC } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';

import { ButtonStyled } from './Button.styles';

interface IButtonProps {
  onClick: (e) => void
  text: string
}

const Button: FC<IButtonProps> = ({onClick, text}) => {
  const {themeColor} = useAppSelector(state => state.settings);

  return (
    <ButtonStyled color={themeColor} onClick={onClick}>
      {text}
    </ButtonStyled>
  );
};

export default Button;
