import React from 'react';
import {SearchContainer} from "./Search.styles";
import cn from "classnames";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import { setSearchCountry } from "@reducers/loginSlice/loginSlice";

const Search = () => {
    const searchCountry = useAppSelector(state => state.login.searchCountry);
    const dispatch = useAppDispatch();

    const removeText = () => {
        dispatch(setSearchCountry(''));
    }

    const onInput = (e: React.FormEvent<HTMLInputElement>) => {
        dispatch(setSearchCountry((e.target as HTMLInputElement).value));
    }

    return (
        <SearchContainer>
            <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" viewBox="0 0 24 24" width="24px" height="24px">
                <path
                    d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 19.585938 21.585938 C 20.137937 22.137937 21.033938 22.137938 21.585938 21.585938 C 22.137938 21.033938 22.137938 20.137938 21.585938 19.585938 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"/>
            </svg>
            <input value={searchCountry} onInput={onInput} type="text"/>
            <span className={cn({hidden: searchCountry})}>Search</span>
            <button onClick={removeText} className={cn({close: true, hidden: !searchCountry})}>&times;</button>
        </SearchContainer>
    );
};

export default Search;
