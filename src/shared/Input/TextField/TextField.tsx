import React, { FC, useContext, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { useAppSelector } from '@hooks/useAppSelector';

import { InputContext } from '../InputContext';

import { TextFieldStyled } from './TextField.styles';

interface ITextFieldProps {
  emitErrorName?: string;
  type?: 'text' | 'tel';
}

const TextField: FC<ITextFieldProps> = ({emitErrorName, type}) => {
  const inputContext = useContext(InputContext);
  const [animate, setAnimate] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const {themeColor} = useAppSelector(state => state.settings);

  useEffect(() => {
    emitErrorName && window.emitter.on(emitErrorName, () => {
      setError(true);
      inputRef.current && inputRef.current.focus();
    });

    return () => {
      emitErrorName && window.emitter.un(emitErrorName);
    };
  }, []);

  if (!inputContext) {
    console.error('InputTextField cannot be without Input');
    return null;
  }

  const {value, setValue, placeholder} = inputContext;

  const onFocus = () => {
    setAnimate(true);
  };

  const onBlur = () => {
    setAnimate(false);
    setError(false);
  };

  const onInput = e => {
    setError(false);
    setValue(e);
  };

  return (
    <TextFieldStyled themeColor={themeColor}>
      <div className={cn('input', {animate, error})}>
        <span className={cn('placeholder', {
          animate: animate || value,
          error,
          'not-active': value && !animate
        })}>
          {placeholder}
        </span>
        <input ref={inputRef} type={type || 'text'} onFocus={onFocus} onBlur={onBlur} onInput={onInput} value={value}/>
      </div>
    </TextFieldStyled>
  );
};

export default TextField;
