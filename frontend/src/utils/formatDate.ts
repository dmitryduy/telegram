import dateFormat from 'dateformat';

import { timestamp } from '../global.typings';

const DAY_BEFORE = 1000 * 60 * 60 * 24;

const formatDate = (timeStamp: timestamp) => {
  const date = +new Date(timeStamp);
  if (new Date(date).getDate() === new Date(Date.now()).getDate() - 1) {
    return 'Yesterday';
  }
  if (Date.now() - date < DAY_BEFORE) {
    return dateFormat(timeStamp, 'HH:MM');
  } else {
    return dateFormat(timeStamp, 'd.mm.yyyy');
  }
};

export default formatDate;