import React, { FC } from 'react';

import Search from './Search/Search';
import { InputContext } from './InputContext';
import TextField from './TextField/TextField';
import TextArea from './TextArea/TextArea';

interface IInputProps {
  value: string
  setValue: (e: React.FormEvent<EventTarget> | string) => void
  placeholder: string
}

interface InputComponent {
  Search: typeof Search
  TextField: typeof TextField
  TextArea: typeof TextArea
}

const Input: FC<IInputProps> & InputComponent = ({children, value, setValue, placeholder}) => {
  return (
    <InputContext.Provider value={{value, setValue, placeholder}}>
      {children}
    </InputContext.Provider>
  );
};

Input.Search = Search;
Input.TextField = TextField;
Input.TextArea = TextArea;

export default Input;
