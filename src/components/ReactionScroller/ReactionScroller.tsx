import React, { FC, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch } from '@hooks/useAppSelector';
import { addReaction } from '@reducers/dialogSlice/dialogSlice';

import Reaction from '../../UIKit/Reaction/Reaction';
import { reaction } from '../../globalTypes';

import { Scroller } from './ReactionScroller.styles';

interface IReactionScrollerProps {
    show: boolean,
    date: number
}

const reactions: reaction[] = ['like', 'dislike', 'heart', 'fire', 'poop'];

const ReactionScroller: FC<IReactionScrollerProps> = ({ show, date}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const mouseEnter = () => {
    setOpen(true);
  };

  const mouseLeave = () => {
    setOpen(false);
  };

  const reactionClick = (reactionName: reaction) => {
    dispatch(addReaction({createDate: date, reaction: reactionName}));
  };

  return (
    <Scroller onMouseEnter={mouseEnter} onMouseLeave={mouseLeave} className={cn({show, open})}>
      {reactions.map(reaction =>
        <Reaction key={reaction} reaction={reaction} onClick={reactionClick.bind(null, reaction)}/>)}
    </Scroller>
  );
};

export default ReactionScroller;
