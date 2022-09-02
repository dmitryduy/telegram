import { useEffect, useState } from 'react';
import useInput from '@hooks/useInput';
import { useDebounce } from 'use-debounce';
import { DEBOUNCE_SEARCH_TIME } from '@components/ChatsSide/ChatsSide.constants';
import { dialogActions } from '@reducers/dialogSlice/dialogSlice';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';

import { searchUsers } from '../../../api/usersServer';

export const useDialogs = () => {
  const userPhone = useAppSelector(state  => state.user.phoneNumber);
  const [searchValue, setSearchValue] = useInput();
  const [debouncedValue] = useDebounce(searchValue, DEBOUNCE_SEARCH_TIME);
  const [searchDialogs, setSearchDialogs] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchDialogs(false);

    if (searchValue) {
      setLoading(true);
    } else {
      setSearchDialogs(false);
    }
  }, [searchValue]);

  useEffect(() => {
    if (debouncedValue && userPhone) {
      setLoading(true);
      searchUsers(debouncedValue, userPhone)
        .then(data => {
          setSearchDialogs(true);
          setLoading(false);
          dispatch(dialogActions.setFoundedGlobalUsers(data));
        });

    }
  }, [debouncedValue]);

  return {
    searchDialogs,
    isLoading,
    searchValue,
    setSearchValue
  };
};
