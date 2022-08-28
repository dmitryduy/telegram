import React, { FC } from 'react';
import dateFormat from 'dateformat';
import cn from 'classnames';
import { useAppDispatch } from '@hooks/useAppSelector';
import { deleteReaction } from '@reducers/dialogSlice/dialogSlice';
import useThrottle from '@hooks/useThrottle';

import Reaction from '../../../UIKit/Reaction/Reaction';
import { reaction } from '../../../globalTypes';

import { Time, TimeTooltip } from './MessageTime.styles';

interface IMessageTime {
    date: number,
    reaction: reaction
}

const MessageTime: FC<IMessageTime> = ({date, reaction}) => {
  const dispatch = useAppDispatch();
  const {isThrottle, onStartThrottle, onEndThrottle} = useThrottle(1000);

  const onDeleteReaction = () => {
    dispatch(deleteReaction(date));
  };

  return (
    <Time>
      {reaction && <Reaction onClick={onDeleteReaction} reaction={reaction}/>}
      <span onMouseEnter={onStartThrottle} onMouseLeave={onEndThrottle}>{dateFormat(date, 'HH:MM')}</span>
      <TimeTooltip className={cn({show: isThrottle})}>{dateFormat(date, 'd mmmm yyyy HH:MM:ss')}</TimeTooltip>
    </Time>
  );
};

export default MessageTime;
