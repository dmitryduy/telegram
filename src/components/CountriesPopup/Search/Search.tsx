import React from 'react';

import Input from "../../../shared/Input/Input";
import { setSearchCountry } from "@reducers/loginSlice/loginSlice";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";

const Search = () => {
    const dispatch = useAppDispatch();
    const searchCountry = useAppSelector(state => state.login.searchCountry);

    const onInput = (e: React.FormEvent<EventTarget> | string) => {
        if (typeof e === 'string') {
            dispatch(setSearchCountry(e));
            return;
        }

        dispatch(setSearchCountry((e.target as HTMLInputElement).value));
    }


    return (
      <Input value={searchCountry} setValue={onInput}>
          <Input.Search placeholder='Search' searchIcon timesIcon/>
      </Input>
    );
};

export default Search;
