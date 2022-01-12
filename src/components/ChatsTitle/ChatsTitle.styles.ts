import styled from "styled-components";

export const ChatsTitleContainer = styled.span`
  display: block;
  background-color: ${props => props.theme.colors.searchTitle};
  padding: 10px;
  color: ${props => props.theme.colors.paragraph};
  font-size: ${props => props.theme.fontSizes.normal};
`;