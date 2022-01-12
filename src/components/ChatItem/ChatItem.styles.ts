import styled from "styled-components";



export const ChatItemContainer = styled.div`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 80px;
  cursor: pointer;
  transition: .1s;

  &:hover {
    background-color: ${props => props.theme.colors.chatItemHover};
  }

  &.active {
    background-color: ${props => props.theme.colors.chatItemActive};
    * {
      color: #fff;
    }
  }
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
  h4 {
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.extraNormal};
    color: ${props => props.theme.colors.heading};
  }

  span {
    color: ${props => props.theme.colors.paragraph};
    font-size: ${props => props.theme.fontSizes.normal};
  }
`;

export const ChatFooter = styled.footer`
display: flex;
  justify-content: space-between;
`;

export const ChatLastMessage = styled.div`
  font-size: ${props => props.theme.fontSizes.extraNormal};
  color: ${props => props.theme.colors.paragraph};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1;
  margin-right: 5px;
`;

export const UnreadMessages = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 20px;
  height: 20px;
  color: #fff;
  padding: 0 5px;
  background-color: ${props => props.theme.colors.unreadMessage};
  border-radius: 10px/ 50%;
  font-size: ${props => props.theme.fontSizes.small};
  
`;

