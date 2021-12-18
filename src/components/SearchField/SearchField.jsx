import React, { useEffect } from 'react';
import { SearchInput } from "./SearchField.styles";
import useInput from "../../hooks/useInput";
import { useDebounce } from "use-debounce";
import { useDispatch } from "react-redux";
import { setSearchResultsAC } from "../../reducers/dialogReducer";

const SearchField = ({setSearch, isSearch, setLoading}) => {
    const [searchValue, setSearchValue] = useInput();
    const [value] = useDebounce(searchValue, 1000);

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
            fetch(`http://localhost:5000/users/${searchValue}`)
                .then(response => response.json())
                .then(data => {
                    setLoading(false);
                    dispatch(setSearchResultsAC(data))
                });

        }
    }, [value])

    return (
        <SearchInput value={searchValue} onInput={setSearchValue} placeholder='Search...'>

        </SearchInput>
    );
};

export default SearchField;
