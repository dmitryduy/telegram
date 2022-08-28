import React, { FC, useContext } from 'react';

import { PopupContext } from '../PopupContext';
import Button from '../../Button/Button';

import { FooterStyled } from './Footer.styles';

interface IFooterProps {
  cancelTitle?: string
  submitTitle?: string
}

const Footer: FC<IFooterProps> = ({ cancelTitle, submitTitle,}) => {
  const popupContext = useContext(PopupContext);

  if (!popupContext) {
    console.error('PopupFooter cannot be without Popup');
    return null;
  }

  return (
    <FooterStyled>
      {cancelTitle && <Button onClick={popupContext.onClose} text={cancelTitle}/>}
      {submitTitle && <Button onClick={popupContext.onSubmit} text={submitTitle}/>}
    </FooterStyled>
  );
};

export default Footer;
