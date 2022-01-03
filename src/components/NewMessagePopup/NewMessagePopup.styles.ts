import styled from "styled-components";

export const NewMessagePopupContainer = styled.div`
  position: fixed;
  display: flex;
  bottom: 5px;
  right: 5px;
  z-index: 9999;
  background-color: #f1f1f1;
  padding: 10px;
  height: 100px;
  width: 400px;
  transition: 1s;
  &.disappear {
    transform: translateX(150%);
  }
  img {
    border-radius: 50%;
    margin-right: 20px;
  }
`;

export const CloseButton = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  transform: translateX(100%);
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

export const Nickname = styled.h3`
  position: relative;
  color: ${props => props.theme.colors.black};
  font-size: ${props => props.theme.fontSizes.medium};
  margin-bottom: 5px;
`;

export const MessageText = styled.p`
  color: ${props => props.theme.colors.darkGray};
  font-size: ${props => props.theme.fontSizes.extraNormal};
  line-height: 18px;
  height: 36px;
  overflow: hidden;
 
`;