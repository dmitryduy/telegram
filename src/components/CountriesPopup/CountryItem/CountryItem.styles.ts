import styled from "styled-components";


export const Item = styled.button`
  width: 100%;
  text-align: left;
  background-color: ${props => props.theme.colors.bgColor};
  padding: 7px ${props => props.theme.other.popupSidePadding};
  border: none;
  cursor: pointer;
  font-weight: 600;
  &:hover {
    background-color: ${props => props.theme.colors.chatItemHover};
  }
  span:last-child {
    padding-left: 10px;
    color: ${props => props.theme.colors.placeholder};
  }
`;