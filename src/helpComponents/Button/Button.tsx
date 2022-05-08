import React, { FC } from 'react';
import { Btn } from './Button.styles';

interface IButtonProps {
    onClick: (e) => void;
}

const Button: FC<IButtonProps> = ({children, onClick}) => {
    return (
        <Btn onClick={onClick}>{children}</Btn>
    );
};

export default Button;
