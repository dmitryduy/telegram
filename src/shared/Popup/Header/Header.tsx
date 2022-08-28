import React, { FC, useContext } from 'react';
import styled from "styled-components";
import { icons } from "../../../icons";
import { PopupContext } from "../PopupContext";

export const HeaderStyled = styled.header`
  color: ${props => props.theme.colors.heading};
  background-color: ${props => props.theme.colors.bgColor};
  font-weight: 600;
  padding: 10px ${props => props.theme.other.popupSidePadding} 0;


  .title {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }

  .extra-content {
    margin-bottom: 5px;

    * {
      border: none;
    }
  }

  svg {
    display: flex;
    align-items: center;
    fill: ${props => props.theme.colors.icons};
    height: 20px;
    width: 20px;
    cursor: pointer;
  }

  h2 {
    flex: 1;
    font-size: ${props => props.theme.fontSizes.medium};
  }

  .back-icon {
    margin-right: 20px;
  }

  .more-icon {
    transform: rotate(90deg);
    margin-right: 20px;
  }
`;

interface IHeaderProps {
  title: string
  closeButton?: boolean
  backButton?: boolean
  moreButton?: boolean
  extraContent?: React.ReactNode
  backEmitName?: string
}

const Header: FC<IHeaderProps> = ({backEmitName, extraContent, closeButton, backButton, title, moreButton}) => {
  const popupContext = useContext(PopupContext);

  const onBack = () => {
    if (!backEmitName) {
      return;
    }

    window.emitter.emit(backEmitName);
  }

  if (!popupContext) {
    console.error('PopupHeader cannot be without Popup');
    return null;
  }

  return (
    <HeaderStyled>
      <div className='title'>
        {backButton && <div onClick={onBack}>{icons.back}</div>}
        <h2>{title}</h2>
        {moreButton && icons.more}
        {closeButton && <div onClick={popupContext.onClose}>{icons.times}</div>}
      </div>
      <div className='extra-content'>
        {extraContent}
      </div>
    </HeaderStyled>
  );

};

export default Header;
