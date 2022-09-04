import styled from 'styled-components';
import { rgba } from 'polished';

export const DateStyled = styled.span`
  position: sticky;
  top: 0;
  align-self: center;
  color: #fff;
  border-radius: 10px;
  background-color: ${props => rgba(props.theme.colors.dateBackground, .5)};
  padding: 4px 7px;
  width: 10%;
  min-width: 100px;
  text-align: center;
  font-size: ${props => props.theme.fontSizes.normal};
  z-index: 999;
`;
