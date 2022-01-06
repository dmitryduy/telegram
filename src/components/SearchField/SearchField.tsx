import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { SearchInput } from "./SearchField.styles";
import useInput from "../../hooks/useInput";
import { useDebounce } from "use-debounce";
import { useDispatch } from "react-redux";
import { setFoundedGlobalUsers } from "../../reducers/dialogReducer/dialogReducer";
import { IGlobalSearch } from "../../../backend/types";
import { useTypedSelector } from "../../hooks/useTypedSelector";

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
            fetch(`http://localhost:5000/users?value=${searchValue}&userPhone=${userPhone!}`)
                .then(response => response.json())
                .then((data: IGlobalSearch) => {
                    setLoading(false);
                    dispatch(setFoundedGlobalUsers(data));
                });

        }
    }, [value]);

    return (
        <SearchInput value={searchValue} onInput={setSearchValue} placeholder='Search...'>

        </SearchInput>
    );
};

export default SearchField;
