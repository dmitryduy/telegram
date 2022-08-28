import React, { FC, useContext } from 'react';
import { icons } from "../../../icons";
import { InputContext } from "../InputContext";
import cn from "classnames";
import { SearchStyled, InputStyled } from './Search.styles';
import { useAppSelector } from "@hooks/useAppSelector";


interface ISearchProps {
  placeholder: string
  searchIcon?: boolean
  timesIcon?: boolean
  bordered?: boolean
}

const Search: FC<ISearchProps> = ({placeholder, searchIcon, timesIcon, bordered}) => {
  const inputContext = useContext(InputContext);
  const {themeColor} = useAppSelector(state => state.settings);

  if (!inputContext) {
    console.error('InputSearch cannot be without Input');
    return null;
  }

  const {value, setValue} = inputContext;

  return (
    <SearchStyled>
      {searchIcon && icons.search}
      <InputStyled className={cn({bordered})} borderColor={themeColor}>
        <div className={cn('placeholder', {hidden: value})}>{placeholder}</div>
        <input type="text" value={value} onInput={setValue}/>
      </InputStyled>
      {timesIcon && <span onClick={() => inputContext.setValue('')}
                          className={cn('times-container', {visible: value})}>{icons.times}</span>}
    </SearchStyled>
  );
};


export default Search;
