import React, { FC, useContext, useEffect } from 'react';
import useResize from '@hooks/useResize';

import { InputContext } from '../InputContext';

import { TextAreaStyled } from './TextArea.styles';
import { useTextareaResize } from './TextArea.hook/useTextareaResize';

interface ITextAreaProps {
  onBlur?: () => void;
  onHeightUpdate?: () => void;
  maxLines?: number;
}

const TextArea: FC<ITextAreaProps> = ({onBlur, onHeightUpdate, maxLines = Infinity}) => {
  const inputContext = useContext(InputContext);
  const [textareaRef, resize] = useTextareaResize(maxLines);
  const width = useResize();

  useEffect(() => {
    resize(onHeightUpdate);
  }, [inputContext?.value, width]);


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
