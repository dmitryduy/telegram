import styled from 'styled-components';
import {rgba} from 'polished';
import { Scroll } from '@styled-components/Scroll';

import { BASE_URL } from '../../types';

export const MessageSideStyled = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

export const Background = styled.div<{backgroundImage: string}>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url(${props => `${BASE_URL}/images/backgrounds/${props.backgroundImage}.webp`});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const EmptyActiveDialog = styled.span`
  z-index: 100;
  align-self: center;
  margin: 0 auto;
  color: #fff;
  font-size: ${props => props.theme.fontSizes.normal};
  padding: 5px;
  background-color: ${props => rgba(props.theme.colors.bgColor, .2)};
  border-radius: 10px;
`;

export const Messages = styled(Scroll)`
  position: absolute;
  z-index: 100;
  left: 0;
  right: 0;
  bottom: 55px;
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 55px - 57px);
  margin-top: auto;
  padding: 5px 20px;
  justify-content: flex-start;
  overflow-x: hidden;
`;