import React from 'react';
import { Background, Bottom, Body, Content } from './Popup.styles';
import ReactDOM from "react-dom";
import Button from "@helpComponents/Button/Button";
import cn from "classnames";
import PopupTitle from "@helpComponents/PopupTitle/PopupTitle";

interface IPopupProps {
    title?: string,
    bottomButton?: string,
    emitCloseName: string,
    active: boolean,
    closeButton?: boolean,
}

const Popup = React.forwardRef<HTMLDivElement | null, IPopupProps & React.ReactNode>(({ closeButton, active, emitCloseName, bottomButton, title, children}, ref)=> {
    const closePopup = (e: React.FormEvent<HTMLElement>) => {
        e.stopPropagation();
        window.emitter.emit(emitCloseName);
    }

    return ReactDOM.createPortal(
        <Background className={cn({active, hidden: !active})} onClick={closePopup}>
            <Content ref={ref} onClick={e => e.stopPropagation()}>
                {title && <PopupTitle closePopup={closePopup} closeButton={closeButton}>{title}</PopupTitle>}
                <Body>{children}</Body>
                {bottomButton && <Bottom><Button onClick={closePopup}>{bottomButton}</Button></Bottom>}
            </Content>
        </Background>,
        document.querySelector('body') as Element
    );
});

export default Popup;
