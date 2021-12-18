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
    background-color: ${props => props.theme.colors.lightGray};
  }

  &.active {
    background-color: ${props => props.theme.colors.darkBlue};

    * {
      color: #fff;
    }
  }
`;

export const ChatImage = styled.img`
  height: 100%;
  object-fit: cover;
  margin-right: 10px;
  border-radius: 50%;
`;

export const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;

  h4 {
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.extraNormal};
    color: ${props => props.theme.colors.black};
  }

  span {
    color: ${props => props.theme.colors.darkGray};
    font-size: ${props => props.theme.fontSizes.normal};
  }
`;

export const ChatLastMessage = styled.div`
  font-size: ${props => props.theme.fontSizes.extraNormal};
  color: ${props => props.theme.colors.black};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;