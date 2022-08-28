import React, { FC, useContext } from 'react';
import Button from "@helpComponents/Button/Button";
import { PopupContext } from "../PopupContext";
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
      {cancelTitle && <Button onClick={popupContext.onClose}>{cancelTitle}</Button>}
      {submitTitle && <Button onClick={popupContext.onSubmit}>{submitTitle}</Button>}
    </FooterStyled>
  );
};

export default Footer;
