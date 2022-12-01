import styled from 'styled-components';

export const UnreadTooltipStyled = styled.div`
  width: calc(100% + 40px);
  transform: translateX(-20px);
  padding: 5px 0;
  text-align: center;
  color: ${props => props.theme.colors.unreadText};
  background-color: ${props => props.theme.colors.unreadTitle};
  font-weight: 500;
  margin: 5px 0;
  position: relative;
`;
