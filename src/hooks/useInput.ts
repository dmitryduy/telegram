import React, { useState } from "react";

const useInput = (startValue = '', pattern = /.*/): [string, (event: React.FormEvent<EventTarget>) => void, () => void] => {
    const [inputValue, setInputValue] = useState(startValue);

    const changeState = (event: React.FormEvent<EventTarget>) => {
        if (pattern.test((event.target as HTMLInputElement).value)) {
            setInputValue((event.target as HTMLInputElement).value);
        }
    }
    return [inputValue, changeState, () => {
        setInputValue('')
    }];
}

export default useInput;