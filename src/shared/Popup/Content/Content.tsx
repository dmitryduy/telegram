import React, { FC, useContext } from 'react';
import cn from 'classnames';

import { PopupContext } from '../PopupContext';

import { ContentStyled } from './Content.styles';

interface IContentProps {
  stylized?: boolean
  bordered?: boolean
}

const Content: FC<IContentProps> = ({children, stylized, bordered}) => {
  const popupContext = useContext(PopupContext);

  if (!popupContext) {
    console.error('PopupContent cannot be without Popup');
    return null;
  }

  return (
    <ContentStyled className={cn({defaultStyles: stylized, bordered})}>
      {children}
    </ContentStyled>
  );
};

export default Content;
