import React, { FC } from 'react';
import { useAppSelector } from '@hooks/useAppSelector';
import cn from 'classnames';

import { ButtonStyled } from './Button.styles';

interface IButtonProps {
  onClick: (e) => void
  text: string
  fullButton?: boolean
}

const Button: FC<IButtonProps> = ({onClick, text, fullButton}) => {
  const {themeColor} = useAppSelector(state => state.settings);

  return (
    <ButtonStyled color={themeColor} onClick={onClick} className={cn({fullButton})}>
      {text}
    </ButtonStyled>
  );
};

export default Button;
