import React, { FC } from 'react';
import { Btn } from './Button.styles';
import { useAppSelector } from "../../hooks/useAppSelector";

interface IButtonProps {
    onClick: (e) => void;
}

const Button: FC<IButtonProps> = ({children, onClick}) => {
    const {themeColor} = useAppSelector(state => state.settings);

    return <Btn color={themeColor} onClick={onClick}>{children}</Btn>;
};

export default Button;
