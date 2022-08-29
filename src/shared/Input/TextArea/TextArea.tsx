import React, { FC, useContext, useEffect, useRef } from 'react';

import { InputContext } from '../InputContext';

import { TextAreaStyled } from './TextArea.styles';

interface ITextAreaProps {
  onBlur: () => void
}

const TextArea: FC<ITextAreaProps> = ({onBlur}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const inputContext = useContext(InputContext);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const oldHeight = textarea.clientHeight;
    textarea.style.height = '1px';
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (oldHeight !== textarea.clientHeight) {
      window.emitter.emit('popup:resize');
    }

  }, [inputContext?.value]);


  if (!inputContext) {
    console.error('TextArea cannot be without Input');
    return null;
  }

  const {value, setValue, placeholder} = inputContext;

  return (
    <TextAreaStyled ref={textareaRef} onBlur={onBlur} onInput={setValue} value={value} placeholder={placeholder}/>
  );
};

export default TextArea;
