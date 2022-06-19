import { Base_Url, IGlobalSearch } from "../types";

export const searchUsers = (searchValue: string, userPhone: string): Promise<IGlobalSearch> => {
    return fetch(`${Base_Url}/users?value=${searchValue}&userPhone=${userPhone}`)
        .then(response => response.json());
}

