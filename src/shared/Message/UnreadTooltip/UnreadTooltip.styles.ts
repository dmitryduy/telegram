import styled from 'styled-components';

export const UnreadTooltipStyled = styled.div`
  width: calc(100% + 40px);
  transform: translateX(-20px);
  padding: 5px 0;
  text-align: center;
  color: ${props => props.theme.colors.darkBlue};
  background-color: #fff;
  font-weight: 600;
  letter-spacing: -1px;
  margin: 5px 0;
  position: relative;
 
`;
