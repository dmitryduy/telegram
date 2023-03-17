import React, { FC } from 'react';
import styled from 'styled-components';
import cn from 'classnames';

interface IHideByConditionProps {
    hide: boolean
}

const Container = styled.div`
  transition: ${props => props.theme.other.transitionSpeed};
  &.hide {
    max-height: 0;
    visibility: hidden;
    opacity: 0;
  }
`;

const HideByCondition: FC<IHideByConditionProps> = ({ hide, children }) => {
  return <Container className={cn({hide})}>{children}</Container>;
};

export default HideByCondition;
