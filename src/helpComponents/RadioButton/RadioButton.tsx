import React, { FC } from 'react';
import styled  from "styled-components";
import cn from "classnames";

const RadioLabel = styled.label<{ color: string }>`
  display: inline-block;
  position: relative;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid ${props => props.color};
  &:before {
    position: absolute;
    content: '';
    width: 26px;
    height: 26px;
    left: -2px;
    top: -2px;
    background-color: ${props => props.color};
    border-radius: 50%;
    transform: scale(0);
    transition: ${props => props.theme.other.transitionSpeedSlow};
  }

  &.active {
    &:before {
      transform: scale(0.6);
    }
  }
  &.filled {
    border: 3px solid ${props => props.color};
    &:before {
      transform: scale(1);
      left: -3px;
      top: -3px;
    }
  }
  &.filled.active {
    &:before {
      transform: scale(0.5);
    }
  }


`;

const Radio = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
`;

interface IRadioButtonProps {
    checked: boolean,
    value: string,
    color?: string,
    filled?: boolean,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: FC<IRadioButtonProps> = ({checked, value, color = '#fff', filled = false, onChange}) => {
    return (
        <RadioLabel color={color} className={cn({active: checked, filled, radiobutton: true})} htmlFor={value}>
            <Radio type='radio' id={value} value={value} checked={checked} onChange={onChange}/>
        </RadioLabel>
    );
};

export default RadioButton;
