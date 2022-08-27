import React, { FC, useContext } from 'react';
import styled from "styled-components";
import cn from "classnames";
import { PopupContext } from "../PopupContext";

const ContentStyled = styled.main`
  &.bordered {
    border-bottom: 1px solid ${props => props.theme.colors.border};
    border-top: 1px solid ${props => props.theme.colors.border};
  }
  
  &.defaultStyles {
    padding: 0 ${props => props.theme.other.popupSidePadding};
    background-color: ${props => props.theme.colors.bgColor};
  }
`;

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
    <ContentStyled className={cn({defaultStyles: stylized, bordered: bordered})}>
      {children}
    </ContentStyled>
  );
};

export default Content;
