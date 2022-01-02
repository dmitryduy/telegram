import dateFormat from "dateformat";
import { timestamp } from "../backend/types";

const DAY_BEFORE = 1000 * 60 * 60 * 24;

const formatDate = (timeStamp: timestamp) => {
    const date = +new Date(timeStamp);
    if (Date.now() - date < DAY_BEFORE) {
        return dateFormat(timeStamp, 'HH:MM');
    } else {
        return dateFormat(timeStamp, 'd:mm:YYYY');
    }
}

export default formatDate;