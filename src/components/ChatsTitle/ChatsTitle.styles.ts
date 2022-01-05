import styled from "styled-components";

export const ChatsTitleContainer = styled.span`
  display: block;
  background-color: ${props => props.theme.colors.lightGray};
  padding: 10px;
  color: ${props => props.theme.colors.darkGray};
  font-size: ${props => props.theme.fontSizes.normal};
`;