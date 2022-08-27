import React, { FC, useContext } from 'react';
import styled from "styled-components";
import Button from "@helpComponents/Button/Button";
import { PopupContext } from "../PopupContext";

const FooterStyled = styled.footer`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px ${props => props.theme.other.popupSidePadding};
  background-color: ${props => props.theme.colors.bgColor};
`;

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
