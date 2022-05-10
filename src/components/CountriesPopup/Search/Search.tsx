import React from 'react';

import Input from "@helpComponents/Input/Input";
import { setSearchCountry } from "@reducers/loginSlice/loginSlice";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";

const Search = () => {
    const dispatch = useAppDispatch();
    const searchCountry = useAppSelector(state => state.login.searchCountry);

    const onInput = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(setSearchCountry((e.target as HTMLInputElement).value));
    }

    const removeText = () => {
        dispatch(setSearchCountry(''));
    }

    return <Input placeHolder='search' value={searchCountry} onInput={onInput} onCloseButtonClick={removeText} closeButton/>
};

export default Search;
