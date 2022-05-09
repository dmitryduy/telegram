import styled from "styled-components";


export const SettingsItemContainer = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  width: 100%;
  padding: 10px;
  font-size: ${props => props.theme.fontSizes.extraNormal};
  font-weight: 600;
  cursor: pointer;
  color: ${props => props.theme.colors.heading};
  &:hover {
    background-color: ${props => props.theme.colors.chatItemHover};
  }
  img {
    margin-right: 15px;
  }
`;