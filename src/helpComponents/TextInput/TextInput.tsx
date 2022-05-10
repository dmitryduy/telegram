import React, { FC, FormEvent, useEffect, useRef, useState } from 'react';
import { TextContainer } from './TextInput.styles';
import cn from "classnames";

interface ITextInputProps {
    placeHolder: string,
    value: string,
    setValue: (event: string | FormEvent<EventTarget>) => void,
    emitErrorName?: string
}

const TextInput: FC<ITextInputProps> = ({placeHolder, value, setValue, emitErrorName}) => {
    const [animate, setAnimate] = useState(false);
    const [error, setError] = useState(false);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const onFocus = () => {
        setAnimate(true);
    }

    const onBlur = () => {
        setAnimate(false);
        setError(false);
    }

    const onInput = (e) => {
        error && setError(false);
        setValue(e);
    }
    useEffect(() => {
        emitErrorName && window.emitter.on(emitErrorName, () => {
            setError(true);
            inputRef.current && inputRef.current.focus();
        })

        return () => {
            emitErrorName && window.emitter.un(emitErrorName);
        };
    }, []);


    return (
        <TextContainer>
            <div className={cn({input: true, animate, error})}>
                <span className={cn({
                    placeholder: true,
                    animate: animate || value,
                    error,
                    'not-active': value && !animate
                })}>{placeHolder}</span>
                <input ref={inputRef} type="text" onFocus={onFocus} onBlur={onBlur} onInput={onInput} value={value}/>
            </div>
        </TextContainer>
    );
};

export default TextInput;
