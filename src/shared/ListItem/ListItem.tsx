import React, { FC } from 'react';
import cn from 'classnames';
import { useAppSelector } from '@hooks/useAppSelector';

import { ListItemStyled, MainContent } from './ListItem.styles';

interface IListItemProps {
  text: string
  onClick: () => void
  subtext?: string
  leftElement?: React.ReactNode
  rightElement?: React.ReactNode | string
  column?: boolean
}

const ListItem: FC<IListItemProps> = ({
  text,
  subtext,
  onClick,
  leftElement,
  column,
  rightElement
}) => {
  const themeColor = useAppSelector(state => state.settings.themeColor);

  return (
    <ListItemStyled onClick={onClick}>
      <div className="left-side">
        {leftElement}
      </div>
      <MainContent className={cn({column})}>
        <span className="text">{text}</span>
        {subtext && <span className="subtext">{subtext}</span>}
      </MainContent>
      {rightElement &&
      typeof rightElement === 'string' ?
        <span style={{color: themeColor }}>{rightElement}</span> :
        rightElement
      }
    </ListItemStyled>
  );
};

export default ListItem;
