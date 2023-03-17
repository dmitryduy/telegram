import dateFormat from 'dateformat';

import { timestamp } from '../../global.typings';

const DAY_TIMESTAMP = 1000 * 60 * 60 * 24;

const dateToString = (date: timestamp): string => {
  const now = Date.now();
  if (now - date < 1000 * 60) {
    return 'recently';
  }
  if (now - date < DAY_TIMESTAMP && new Date(date).getDate() === new Date(now).getDate()) {
    return dateFormat(date, 'HH:MM');
  }
  if (now - date < DAY_TIMESTAMP && new Date(date).getDate() !== new Date(now).getDate()) {
    return 'yesterday at ' + dateFormat(date, 'HH:MM');
  }
  return dateFormat(date, 'dd.mm.yyyy');

};

export default dateToString;