import React, { FC, useContext, useEffect, useRef } from 'react';

import { InputContext } from '../InputContext';

import { TextAreaStyled } from './TextArea.styles';
import { getTextAreaRowsCount } from './TextArea.utils/getTextAreaRowsCount';

interface ITextAreaProps {
  onBlur?: () => void;
  onHeightUpdate?: () => void;
  maxLines?: number;
}

const TextArea: FC<ITextAreaProps> = ({onBlur, onHeightUpdate, maxLines}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const inputContext = useContext(InputContext);
  const linesRef = useRef(1);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const oldHeight = textarea.clientHeight;
    textarea.style.height = '1px';
    textarea.style.height = `${textarea.scrollHeight}px`;

    if (oldHeight > textarea.clientHeight) {
      linesRef.current = getTextAreaRowsCount(textarea);
    }

    if (linesRef.current === maxLines) {
      textarea.style.height = `${oldHeight}px`;
      return;
    }

    if (oldHeight !== textarea.clientHeight) {
      onHeightUpdate && onHeightUpdate();
      linesRef.current = getTextAreaRowsCount(textarea);
    }

  }, [inputContext?.value]);


  if (!inputContext) {
    console.error('TextArea cannot be without Input');
    return null;
  }

  const {value, setValue, placeholder, onKeyUp} = inputContext;

  return (
    <TextAreaStyled
      onKeyUp={onKeyUp}
      ref={textareaRef}
      onBlur={onBlur}
      onInput={setValue}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default TextArea;
