import styled from 'styled-components';
import { Scroll } from '@styled-components/Scroll';

export const MessagesStyled = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
`;

export const MessagesContent = styled(Scroll)`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  overflow: auto;
  overflow-x: hidden;
`;
