import { phone } from "../backend/types";


export const beautifyPhone = (phone: phone): phone=>  {
    return `+ ${phone[0]} ${phone.slice(1, 4)} ${phone.slice(4, 7)} ${phone.slice(7)}`;
}