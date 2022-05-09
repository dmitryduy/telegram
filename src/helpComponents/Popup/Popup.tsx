import React, { FC } from 'react';
import { Background, Bottom, Body, Title, Content } from './Popup.styles';
import ReactDOM from "react-dom";
import Button from "@helpComponents/Button/Button";
import cn from "classnames";

interface IPopupProps {
    title: string,
    bottomButton?: string,
    emitName: string,
    active: boolean
}

const Popup: FC<IPopupProps> = ({active, emitName, bottomButton, title, children}) => {
    const closePopup = (e) => {
        e.stopPropagation();
        window.emitter.emit(emitName);
    }

    return ReactDOM.createPortal(
        <Background className={cn({active, hidden: !active})} onClick={closePopup}>
            <Content onClick={e => e.stopPropagation()}>
                <Title>{title}</Title>
                <Body>{children}</Body>
                {bottomButton && <Bottom><Button onClick={closePopup}>{bottomButton}</Button></Bottom>}
            </Content>
        </Background>,
        document.querySelector('body') as Element
    );
};

export default Popup;
