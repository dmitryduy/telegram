import React, { FC } from 'react';
import { FlexContainer } from '@styled-components/FlexContainer';

import { ThemeItemContainer, ThemeNameTooltip } from './ThemeItem.styles';

interface IThemeItemProps {
    bgColor: string,
    partnerMessageColor: string,
    myMessageColor: string,
    name: string,
    nameColor?: string
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void
}

const ThemeItem: FC<IThemeItemProps> = ({
  myMessageColor,
  partnerMessageColor,
  bgColor,
  nameColor,
  children,
  onClick,
  name
}) => {
  return (
    <FlexContainer direction="column">
      <ThemeItemContainer
        style={{backgroundColor: bgColor}}
        beforeColor={partnerMessageColor}
        afterColor={myMessageColor}
        onClick={onClick}>
        {children}
      </ThemeItemContainer>
      <ThemeNameTooltip style={{color: nameColor}}>{name}</ThemeNameTooltip>
    </FlexContainer>
  );
};

export default ThemeItem;
