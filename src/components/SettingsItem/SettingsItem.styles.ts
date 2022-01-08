import styled from "styled-components";


export const SettingsItemContainer = styled.li`
  list-style: none;
  width: 100%;
  padding: 10px;
  font-size: ${props => props.theme.fontSizes.extraNormal};
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: ${props => props.theme.colors.lightGray};
  }
`;