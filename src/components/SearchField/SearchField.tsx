import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useDispatch } from "react-redux";

import { useDebounce } from "use-debounce";

import { SearchInput } from "./SearchField.styles";

import useInput from "../../hooks/useInput";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setFoundedGlobalUsers } from "../../reducers/dialogReducer/dialogReducer";
import { Base_Url, IGlobalSearch } from "../../types";

interface ISearchFieldProps {
    setSearch: Dispatch<SetStateAction<boolean>>,
    isSearch: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

const SearchField: React.FC<ISearchFieldProps> = ({setSearch, isSearch, setLoading}) => {
    const [searchValue, setSearchValue] = useInput();
    const [value] = useDebounce(searchValue, 1000);
    const userPhone = useTypedSelector(({user})  => user.phoneNumber);

    const dispatch = useDispatch();

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
                    dispatch(setFoundedGlobalUsers(data));
                });

        }
    }, [value]);

    return <SearchInput value={searchValue} onInput={setSearchValue} placeholder='Search...'/>;

};

export default SearchField;
