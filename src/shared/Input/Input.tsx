import React, { FC } from 'react';

import Search from './Search/Search';
import { IInputContext, InputContext } from './InputContext';
import TextField from './TextField/TextField';
import TextArea from './TextArea/TextArea';

interface InputComponent {
  Search: typeof Search
  TextField: typeof TextField
  TextArea: typeof TextArea
}

const Input: FC<IInputContext> & InputComponent = ({
  children,
  value,
  setValue,
  placeholder,
  onKeyUp
}) => {
  return (
    <InputContext.Provider value={{value, setValue, placeholder, onKeyUp}}>
      {children}
    </InputContext.Provider>
  );
};

Input.Search = Search;
Input.TextField = TextField;
Input.TextArea = TextArea;

export default Input;
