import styled from 'styled-components';
import {rgba} from 'polished';

export const MessageSideStyled = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  height: 100%;
  transition: ${props => props.theme.other.transitionSpeedSlow};
  &.isMove {
    transform: translateX(-100vw);
  }
`;


export const Background = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -1;
`;

export const EmptyActiveDialog = styled.span`
  margin: auto;
  color: #fff;
  font-size: ${props => props.theme.fontSizes.normal};
  padding: 5px;
  background-color: ${props => rgba(props.theme.colors.bgColor, .2)};
  border-radius: 10px;
`;