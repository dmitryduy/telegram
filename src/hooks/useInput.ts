import React, { useState } from 'react';

const useInput = (
  startValue = '',
  pattern = /.*/): [string, (event: React.FormEvent<EventTarget> | string) => void, () => void] => {
  const [inputValue, setInputValue] = useState(startValue);

  const changeState = (event: React.FormEvent<EventTarget> | string) => {
    if (typeof event === 'string') {
      setInputValue(event);
      return;
    }

    const value = (event.target as HTMLInputElement).value;
    if (pattern.test(value) && !value.includes('\n')) {
      setInputValue(value);
    }
  };
  return [inputValue, changeState, () => {
    setInputValue('');
  }];
};

export default useInput;