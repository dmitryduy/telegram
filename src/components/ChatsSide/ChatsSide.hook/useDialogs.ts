import { useEffect, useState } from 'react';
import useInput from '@hooks/useInput';
import { useDebounce } from 'use-debounce';
import { DEBOUNCE_SEARCH_TIME } from '@components/ChatsSide/ChatsSide.constants';
import { useAppDispatch, useAppSelector } from '@hooks/useAppSelector';
import { setFoundedGlobalUsers } from '@reducers/dialogSlice/dialogSlice';

import { searchUsers } from '../../../api/usersServer';

export const useDialogs = () => {
  const userPhone = useAppSelector(state => state.user.phoneNumber);
  const activeDialogPhone = useAppSelector(state => state.dialog.activeDialog?.phoneNumber);
  const [searchValue, setSearchValue] = useInput();
  const [debouncedValue] = useDebounce(searchValue, DEBOUNCE_SEARCH_TIME);
  const [searchDialogs, setSearchDialogs] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearchDialogs(false);
    setLoading(!!searchValue);

  }, [searchValue]);

  useEffect(() => {
    setSearchValue('');
  }, [activeDialogPhone]);

  useEffect(() => {
    if (debouncedValue && userPhone) {
      setLoading(true);
      searchUsers(debouncedValue, userPhone)
        .then(data => {
          setSearchDialogs(true);
          setLoading(false);
          dispatch(setFoundedGlobalUsers(data));
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
