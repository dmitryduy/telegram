import { useState } from "react";

const useInput = (startValue='', pattern=/.*/) => {
    const [inputValue, setInputValue] = useState(startValue);

    const changeState = (event) => {
        if (pattern.test(event.target.value)) {
            setInputValue(event.target.value);
        }
    }
    return [inputValue, changeState];
}

export default useInput;