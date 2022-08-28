import { BASE_URL, IGlobalSearch } from '../types';

export const searchUsers = (searchValue: string, userPhone: string): Promise<IGlobalSearch> => {
  return fetch(`${BASE_URL}/users?value=${searchValue}&userPhone=${userPhone}`)
    .then(response => response.json());
};

