import styled from "styled-components";
import { rgba } from "polished";


export const Title = styled.h3`
  font-size: ${props => props.theme.fontSizes.extraMedium};
  font-weight: 500;
  margin-bottom: 20px;
`;

export const Loading = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BackgroundsContainer = styled.div`
  display: grid;
  width: 100%;
  flex: 1;
  overflow: auto;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-bottom: 10px;
  &::-webkit-scrollbar {
    display: none;
  }
  img {
    width: 100%;
    height: 300px;
    
    cursor: pointer;
    border: 3px solid transparent;
    &.active {
      border: 3px solid ${props => props.theme.colors.imageBorder};
    }
  }
`;

export const Button = styled.button`
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