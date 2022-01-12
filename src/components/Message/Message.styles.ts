import styled, { css } from "styled-components";

export const NewDate = styled.div`
  align-self: center;
  color: #fff;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.dateBackground};
  padding: 4px 7px;
  font-size: ${props => props.theme.fontSizes.normal};
`;

export const UnreadMessagesMark = styled.div`
  width:100%;
  padding: 5px 0;
  text-align: center;
  color: ${props => props.theme.colors.unreadText};
  background-color:${props => props.theme.colors.unreadTitle};
  font-size :${props => props.theme.fontSizes.extraSmall};
  font-weight: 600;
  margin: 5px 0;
  cursor: default;
  position: relative;
  &:before, &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 100%;
    background-color: inherit;
    top: 0;
  }
  &:before {
    left: -20px;
  }
  &:after {
    right: -20px;
  }
`;

export const MessageContainer = styled.div<{isShowBefore: boolean}>`
  display: flex;
  max-width: 70%;
  margin: 2px 0;
  padding: 7px 10px;
  border-radius: 7px;
  align-items: flex-end;
  color: ${props => props.theme.colors.heading};
  position: relative;
  &::before {
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    bottom: 0;
  }
  &.me {
    background-color: ${props => props.theme.colors.userMessage};
    align-self: flex-end;
  ${props => props.isShowBefore && css`
    &::before {
      border-bottom: 12px solid ${props => props.theme.colors.userMessage};
      right: -7px;
    }
  `}
  }

  &.partner {
    background-color: ${props => props.theme.colors.partnerMessage};
    align-self: flex-start;
    ${props => props.isShowBefore && css`
      &::before {
        border-bottom: 12px solid ${props => props.theme.colors.partnerMessage};
        left: -7px;
      }
    `}
   
  }
`;

export const MessageText = styled.span`
  margin-right: 7px;
  font-size: ${props => props.theme.fontSizes.normal};
  width: calc(100% - 37px);
  word-wrap: break-word;
`;

export const MessageTime = styled.span`
  color: ${props => props.theme.colors.paragraph};
  font-size: ${props => props.theme.fontSizes.small};
`;