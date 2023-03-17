import React from 'react';
import dateFormat from 'dateformat';

import { DateStyled } from './DateTooltip.styles';

interface IDateProps {
  timestamp: number;
}

const DateTooltip: React.FC<IDateProps> = ({timestamp}) => {
  return (
    <DateStyled>
      {dateFormat(timestamp, 'mmmm d')}
    </DateStyled>
  );
};

export default DateTooltip;