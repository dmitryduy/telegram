import React, { FC } from 'react';
import styled from "styled-components";

interface ICloseButton {
    className?: string,
    onClick: (e: React.FormEvent<HTMLButtonElement>) => void
}

const Button = styled.button`
  position: absolute;
  right: 15px;
  background-color: transparent;
  border: none;
  font-size: 25px;
  color: ${props => props.theme.colors.placeholder};
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: ${props => props.theme.other.transitionFast};
`;

const CloseButton: FC<ICloseButton> = ({ className, onClick}) => {
    return <Button onClick={onClick} className={className || ''}>&times;</Button>;
};

export default CloseButton;
