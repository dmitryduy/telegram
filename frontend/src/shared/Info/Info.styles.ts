import styled from 'styled-components';

export const InfoStyled = styled.div`
  background-color: ${props => props.theme.colors.searchTitle};
  padding: 7px 10px;
  color: ${props => props.theme.colors.paragraph};
  font-size: ${props => props.theme.fontSizes.extraSmall};
`;
