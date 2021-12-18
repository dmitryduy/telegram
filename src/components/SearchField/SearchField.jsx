import React, { useEffect } from 'react';
import { SearchInput } from "./SearchField.styles";
import useInput from "../../hooks/useInput";
import debounce from "../../debounce";
const SearchField = ({setSearch, isSearch}) => {
    const [searchValue, setSearchValue] = useInput();

    useEffect(() => {
        debounce(() => {
            if (!searchValue && isSearch) {
                setSearch(false);
            } else if (searchValue && !isSearch) {
                setSearch(true);
            }
            if (searchValue) {
                fetch(`http://localhost:5000/users/${searchValue}`)
                    .then(response => response.json())
                    .then(data => console.log(data));
            }
        }, 1000);

    }, [searchValue])

    return (
        <SearchInput value={searchValue} onInput={setSearchValue} placeholder='Search...'>

        </SearchInput>
    );
};

export default SearchField;
