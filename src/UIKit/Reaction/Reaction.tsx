import React, { FC } from 'react';
import styled from 'styled-components';

import { reaction } from '../../globalTypes';
const reactions: {[T in keyof reaction]: string} = {
  'like': '👍',
  'dislike': '👎',
  'heart': '💛',
  'fire': '🔥',
  'poop': '💩'
};

interface IReactionProps {
    reaction: reaction,
    onClick: () => void
}

const ReactionContainer = styled.span`
  cursor: pointer;
  font-size: ${props => props.theme.fontSizes.medium};
`;

const Reaction: FC<IReactionProps> = ({reaction, onClick}) => {
  return (
    <ReactionContainer className="reaction" onClick={onClick}>
      {reaction && reactions[reaction]}
    </ReactionContainer>
  );
};

export default Reaction;
