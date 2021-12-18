import dateFormat from "dateformat";

const DAY_BEFORE = 1000 * 60 * 60 * 24;

const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    if (Date.now() - date < DAY_BEFORE) {
        return dateFormat(timeStamp, 'HH:MM');
    } else {
        return dateFormat(timeStamp, 'd:mm:YYYY');
    }
}

export default formatDate;