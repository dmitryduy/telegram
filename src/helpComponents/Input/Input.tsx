import React, { FC, useEffect, useRef } from 'react';
import cn from "classnames";
import CloseButton from "@helpComponents/CloseButton/CloseButton";
import { InputContainer } from './Input.styles';
import noop from "@helpers/noop";

interface IInputProps {
    closeButton?: boolean,
    onCloseButtonClick?: () => void
    onInput: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    onBlur?: () => void
    value: string,
    placeHolder: string,
    textarea?: boolean
}

const Input: FC<IInputProps> = ({onInput, closeButton, onCloseButtonClick, value, placeHolder, textarea, onBlur}) => {

    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const oldHeight = textarea.clientHeight;
        textarea.style.height = '1px';
        textarea.style.height = textarea.scrollHeight + 'px';

        if (oldHeight !== textarea.clientHeight) {
            window.emitter.emit('popup:resize');
        }

    }, [value]);


    return (
        <InputContainer className='input-container'>
            {!textarea && <input onChange={onBlur || noop} value={value} onInput={onInput} type="text"/>}
            {textarea && <textarea ref={textareaRef} onBlur={onBlur || noop} onInput={onInput} value={value}>{value}</textarea>}
            <span className={cn({hidden: value})}>{placeHolder}</span>
            {closeButton &&
            <CloseButton className={cn({close: true, hidden: !value})} onClick={onCloseButtonClick || noop}/>}
        </InputContainer>
    );
};

export default Input;
