import React from 'react';
import { Background, Bottom, Body, Content } from './Popup.styles';
import ReactDOM from "react-dom";
import Button from "../../helpComponents/Button/Button";
import cn from "classnames";
import PopupTitle from "../../helpComponents/PopupTitle/PopupTitle";
import noop from "../../helpers/noop";
import { FlexContainer } from "../../Styled-components/FlexContainer";

interface IPopupProps {
    emitCloseName: string,
    active: boolean,
    title?: string,
    bottomButton?: string,
    submitButton?: string,
    onSubmit?: () => void
    closeButton?: boolean,
    zIndex?: number,
    top?: number,
    width?: number,
}

const Popup = React.forwardRef<HTMLDivElement | null, IPopupProps & React.ReactNode>((props, ref)=> {
    const closePopup = (e: React.FormEvent<HTMLElement>) => {
        e.stopPropagation();
        window.emitter.emit(props.emitCloseName);
    }

    return ReactDOM.createPortal(
        <Background as={FlexContainer} style={{zIndex: props.zIndex}} className={cn({active: props.active, hidden: !props.active})} onClick={closePopup}>
            <Content style={{top: props.top, width: props.width}} ref={ref} onClick={e => e.stopPropagation()}>
                {props.title && <PopupTitle closePopup={closePopup} closeButton={props.closeButton}>{props.title}</PopupTitle>}
                <Body>{props.children}</Body>
                {(props.bottomButton || props.submitButton) &&
                <Bottom>
                    {props.bottomButton && <Button onClick={closePopup}>{props.bottomButton}</Button>}
                    {props.submitButton && <Button onClick={props.onSubmit || noop}>{props.submitButton}</Button>}
                </Bottom>
                }
            </Content>
        </Background>,
        document.querySelector('body') as Element
    );
});

export default Popup;
