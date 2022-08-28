import styled from 'styled-components';


export const SettingsItemContainer = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
  width: 100%;
  padding: 7px 20px;
  font-size: ${props => props.theme.fontSizes.extraNormal};
  font-weight: 600;
  cursor: pointer;
  color: ${props => props.theme.colors.heading};
  user-select: none;
  background-color: ${props => props.theme.colors.bgColor};
  &:hover {
    background-color: ${props => props.theme.colors.chatItemHover};
  }
  img {
    margin-right: 15px;
    border-radius: 7px;
  }
`;