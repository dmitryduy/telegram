import { BASE_URL } from '../types';
import { IGlobalSearchResults } from '../global.typings';

export const searchUsers = (searchValue: string, userPhone: string): Promise<IGlobalSearchResults> => {
  return fetch(`${BASE_URL}/users?value=${searchValue}&userPhone=${userPhone}`)
    .then(response => response.json());
};

