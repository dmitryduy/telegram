import React, { FC, useContext } from 'react';
import { icons } from "../../../icons";
import { PopupContext } from "../PopupContext";
import { HeaderStyled } from './Header.styles';

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
