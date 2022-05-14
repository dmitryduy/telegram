import styled from "styled-components";
import { rgba } from "polished";

export const Btn = styled.button<{color: string}>`
  cursor: pointer;
  color: ${props => props.color};
  padding: 5px 10px;
  background-color: transparent;
  border: none;
  font-weight: 600;
  font-size: ${props => props.theme.fontSizes.extraNormal};
  outline: none;
  border-radius: 3px;
  &:hover:not(:disabled) {
    background-color: ${props => rgba(props.color, .1)};
  }
  &:disabled {
    cursor: default;
    color: ${props => props.theme.colors.buttonDisabled};
  }
`;