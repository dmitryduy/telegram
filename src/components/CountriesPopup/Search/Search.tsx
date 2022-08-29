import React from 'react';
import { setSearchCountry } from '@reducers/loginSlice/loginSlice';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';

import Input from '../../../shared/Input/Input';

const Search = () => {
  const dispatch = useAppDispatch();
  const searchCountry = useAppSelector(state => state.login.searchCountry);

  const onInput = (e: React.FormEvent<EventTarget> | string) => {
    if (typeof e === 'string') {
      dispatch(setSearchCountry(e));
      return;
    }

    dispatch(setSearchCountry((e.target as HTMLInputElement).value));
  };


  return (
    <Input value={searchCountry} setValue={onInput} placeholder="Search">
      <Input.Search searchIcon timesIcon/>
    </Input>
  );
};

export default Search;
