import React, { FC } from 'react';
import { Background, Bottom, Body, Title, Content } from './Popup.styles';
import ReactDOM from "react-dom";
import Button from "@helpComponents/Button/Button";
import cn from "classnames";
import CloseButton from "@helpComponents/CloseButton/CloseButton";

interface IPopupProps {
    title: string,
    bottomButton?: string,
    emitCloseName: string,
    active: boolean,
    closeButton?: boolean
}

const Popup: FC<IPopupProps> = ({closeButton, active, emitCloseName, bottomButton, title, children}) => {
    const closePopup = (e) => {
        e.stopPropagation();
        window.emitter.emit(emitCloseName);
    }

    return ReactDOM.createPortal(
        <Background className={cn({active, hidden: !active})} onClick={closePopup}>
            <Content onClick={e => e.stopPropagation()}>
                <Title>{title} {closeButton && <CloseButton onClick={closePopup}/>}</Title>
                <Body>{children}</Body>
                {bottomButton && <Bottom><Button onClick={closePopup}>{bottomButton}</Button></Bottom>}
            </Content>
        </Background>,
        document.querySelector('body') as Element
    );
};

export default Popup;
