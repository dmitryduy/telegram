import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { useDebounce } from "use-debounce";

import { SearchInput } from "./SearchField.styles";

import useInput from "@hooks/useInput";
import { useAppDispatch, useAppSelector } from "@hooks/useAppSelector";
import { dialogActions } from "@reducers/dialogSlice/dialogSlice";
import { searchUsers } from "../../api/usersServer";

interface ISearchFieldProps {
    setSearch: Dispatch<SetStateAction<boolean>>,
    isSearch: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>
}

const SearchField: React.FC<ISearchFieldProps> = ({setSearch, isSearch, setLoading}) => {
    const [searchValue, setSearchValue] = useInput();
    const [value] = useDebounce(searchValue, 1000);
    const userPhone = useAppSelector(({user})  => user.phoneNumber);
    const {themeColor} = useAppSelector(state => state.settings);

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
        if (value && userPhone) {
            searchUsers(value, userPhone)
                .then((data) => {
                    setLoading(false);
                    dispatch(dialogActions.setFoundedGlobalUsers(data));
                });

        }
    }, [value]);

    useEffect(() => {
        window.emitter.on<{value: string}>('global-search-value', (data) => {
            data && setSearchValue(data.value);
        })
        return () => window.emitter.un('global-search-value');
    }, []);


    return <SearchInput color={themeColor} value={searchValue} onInput={setSearchValue} placeholder='Search...'/>;

};

export default SearchField;
