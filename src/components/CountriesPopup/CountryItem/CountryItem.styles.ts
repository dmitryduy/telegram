import styled from "styled-components";


export const Item = styled.button`
  width: 100%;
  text-align: left;
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 7px ${props => props.theme.other.popupPaddings};
  font-weight: 600;
  &:hover {
    background-color: ${props => props.theme.colors.chatItemHover};
  }
  span:last-child {
    padding-left: 10px;
    color: ${props => props.theme.colors.placeholder};
  }
`;