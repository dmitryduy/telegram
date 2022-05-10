import React from 'react';
import { Background, Bottom, Body, Content } from './Popup.styles';
import ReactDOM from "react-dom";
import Button from "@helpComponents/Button/Button";
import cn from "classnames";
import PopupTitle from "@helpComponents/PopupTitle/PopupTitle";
import noop from "@helpers/noop";

interface IPopupProps {
    title?: string,
    bottomButton?: string,
    submitButton?: string,
    onSubmit?: () => void
    emitCloseName: string,
    active: boolean,
    closeButton?: boolean,
    zIndex?: number,
    top?: string
}

const Popup = React.forwardRef<HTMLDivElement | null, IPopupProps & React.ReactNode>((props, ref)=> {
    const closePopup = (e: React.FormEvent<HTMLElement>) => {
        e.stopPropagation();
        window.emitter.emit(props.emitCloseName);
    }

    return ReactDOM.createPortal(
        <Background style={{zIndex: props.zIndex}} className={cn({active: props.active, hidden: !props.active})} onClick={closePopup}>
            <Content style={{top: props.top}} ref={ref} onClick={e => e.stopPropagation()}>
                {props.title && <PopupTitle closePopup={closePopup} closeButton={props.closeButton}>{props.title}</PopupTitle>}
                <Body>{props.children}</Body>
                {(props.bottomButton || props.submitButton) &&
                <Bottom>
                    {props.bottomButton && <Button onClick={closePopup || noop}>{props.bottomButton}</Button>}
                    {props.submitButton && <Button onClick={props.onSubmit || noop}>{props.submitButton}</Button>}
                </Bottom>
                }
            </Content>
        </Background>,
        document.querySelector('body') as Element
    );
});

export default Popup;
