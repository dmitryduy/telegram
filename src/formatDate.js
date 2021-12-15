const DAY_BEFORE = 1000 * 60 * 60 * 24;

const formatDate = (timeStamp) => {
    const date = new Date(timeStamp);
    if (Date.now() - date < DAY_BEFORE) {
        return `${date.getHours()}:${date.getMinutes()}`;
    } else {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    }
}

export default formatDate;