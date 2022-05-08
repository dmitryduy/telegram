import styled from "styled-components";
import { rgba } from "polished";

export const Btn = styled.button`
  cursor: pointer;
  color: ${props => props.theme.colors.button};
  padding: 5px 10px;
  background-color: transparent;
  border: none;
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.extraNormal};
  outline: none;
  &:hover:not(:disabled) {
    background-color: ${props => rgba(props.theme.colors.button, .2)};
  }
  &:disabled {
    cursor: default;
    color: ${props => props.theme.colors.buttonDisabled};
  }
`;