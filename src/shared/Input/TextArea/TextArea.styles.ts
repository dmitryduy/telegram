import styled from "styled-components";

export const TextAreaStyled = styled.textarea`
  outline: none;
  background-color: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.inputColor};
  border: none;
  font-size: ${props => props.theme.fontSizes.extraMedium};
  resize: none;
  overflow: hidden;
  font-size: ${props => props.theme.fontSizes.normal};
  padding-bottom: 15px;
`;