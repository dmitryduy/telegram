import React, { useState } from "react";
import isNumber from "../helpers/isNumber";


const isCorrectByMask = (value: string, mask: string) => {
    if (value.length > mask.length) return false;

    const lastInputIndex = value.length - 1;

    if (isNumber(value[lastInputIndex]) !== isNumber(mask[lastInputIndex])
        || (mask[lastInputIndex] !== value[lastInputIndex] && !isNumber(value[lastInputIndex]))) {
        return false;
    }

    return true;
}

const inputWithMask = (value: string, mask: string) => {
    let newValue = value.slice(0, value.length - 1);
    let maskIndex = value.length - 1;

    while (!isNumber(mask[maskIndex]) && mask[maskIndex]) {
        newValue+= mask[maskIndex];
        maskIndex++;
    }

    return newValue + value[value.length - 1];
}

const useMask = (mask: string): [string, (e: React.FormEvent<EventTarget> | string) => void, () => void] => {
    const [value, setValue] = useState<string>('');

    const changeValue = (e: React.FormEvent<EventTarget> | string) => {
        if (typeof e === 'string') {
            setValue(e);
            return;
        }

        const input = e.target as HTMLInputElement;
        if (isNumber(input.value[input.value.length - 1]) && !isNumber(mask[input.value.length - 1])) {
            input.value = inputWithMask(input.value, mask);
        }
        isCorrectByMask(input.value, mask) && setValue(input.value);
    }

    return [value, changeValue, () => setValue('')];
}

export default useMask;