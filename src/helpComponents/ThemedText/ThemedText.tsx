import React, { FC } from 'react';
import styled from "styled-components";
import { useAppSelector } from "@hooks/useAppSelector";
import noop from "@helpers/noop";

const Container = styled.p`
  font-size: ${props => props.theme.fontSizes.normal};
  font-weight: 400;
  transform: ${props => props.theme.other.transitionSpeed};
  cursor: pointer;
`;

interface IThemeTextProps {
    text: string,
    onClick?: (e: React.MouseEvent<HTMLParagraphElement>) => void,
}

const ThemedText: FC<IThemeTextProps> = ({text, onClick}) => {
    const {themeColor} = useAppSelector(state => state.settings);

    return <Container className='themed-text' style={{color: themeColor}} onClick={onClick || noop}>{text}</Container>;
};

export default ThemedText;
