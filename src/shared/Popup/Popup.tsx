import React from 'react';
import { Background, ContentStyled } from './Popup.styles';
import ReactDOM from "react-dom";

import cn from "classnames";
import { FlexContainer } from "@styled-components/FlexContainer";
import Header from "./Header/Header";
import Content from './Content/Content';
import Footer from "./Footer/Footer";
import { PopupContext } from './PopupContext';
import noop from "@helpers/noop";
import { DEFAULT_POPUP_TOP_POSITION, DEFAULT_POPUP_WIDTH } from "./Popup.constants";

interface IPopupProps {
  active: boolean
  children: React.ReactNode
  emitCloseName: string
  onSubmit?: () => void
  top?: number
  width?: number
}

interface PopupComponent extends React.ForwardRefExoticComponent<IPopupProps & React.RefAttributes<HTMLDivElement>> {
  Header: typeof Header
  Content: typeof Content
  Footer: typeof Footer
}

const Popup = React.forwardRef<HTMLDivElement | null, IPopupProps & React.ReactNode>((props, ref) => {
  const closePopup = (e: React.FormEvent<HTMLElement>) => {
    e.stopPropagation();
    window.emitter.emit(props.emitCloseName);
  }

  return ReactDOM.createPortal(
    <PopupContext.Provider value={{onClose: closePopup, onSubmit: props.onSubmit || noop}}>
      <Background as={FlexContainer}
                  className={cn({active: props.active, hidden: !props.active})}
                  onClick={closePopup}>
        <ContentStyled style={{top: props.top || DEFAULT_POPUP_TOP_POSITION, width: props.width || DEFAULT_POPUP_WIDTH}}
                       ref={ref}
                       onClick={e => e.stopPropagation()}>
          {props.children}
        </ContentStyled>
      </Background>
    </PopupContext.Provider>,
    document.querySelector('body') as Element
  );
}) as PopupComponent;

Popup.Header = Header;
Popup.Content = Content;
Popup.Footer = Footer;

export default Popup;
