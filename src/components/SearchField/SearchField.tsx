import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { useDebounce } from "use-debounce";

import { SearchInput } from "./SearchField.styles";

import useInput from "../../hooks/useInput";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppSelector";
import { Base_Url, IGlobalSearch } from "../../types";
import { dialogActions } from "../../reducers/dialogSlice/dialogSlice";

interface ISearchFieldProps {
    setSearch: Dispatch<SetStateAction<boolean>>,
    isSearch: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

const SearchField: React.FC<ISearchFieldProps> = ({setSearch, isSearch, setLoading}) => {
    const [searchValue, setSearchValue] = useInput();
    const [value] = useDebounce(searchValue, 1000);
    const userPhone = useAppSelector(({user})  => user.phoneNumber);

    const dispatch = useAppDispatch();

    useEffect(() => {
        setLoading(true);
        if (!searchValue && isSearch) {
            setSearch(false);
        } else if (searchValue && !isSearch) {
            setSearch(true);
        }
    }, [searchValue])

    useEffect(() => {
        if (value) {
            fetch(`${Base_Url}/users?value=${searchValue}&userPhone=${userPhone!}`)
                .then(response => response.json())
                .then((data: IGlobalSearch) => {
                    setLoading(false);
                    dispatch(dialogActions.setFoundedGlobalUsers(data));
                });

        }
    }, [value]);

    return <SearchInput value={searchValue} onInput={setSearchValue} placeholder='Search...'/>;

};

export default SearchField;
