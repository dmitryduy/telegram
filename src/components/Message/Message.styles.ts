import styled, { css } from 'styled-components';

export const NewDate = styled.div`
  position: sticky;
  top: 1px;
  align-self: center;
  color: #fff;
  border-radius: 10px;
  background-color: ${props => props.theme.colors.dateBackground};
  padding: 4px 7px;
  width: 10%;
  min-width: 100px;
  text-align: center;
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

export const MessageContainer = styled.div<{showBefore: boolean}>`
  max-width: 50%;
  min-height: 35px;
  padding: 7px 10px;
  border-radius: 7px;
  margin: 2px 0 2px 35px;
  align-self: flex-start;
  color: ${props => props.theme.colors.heading};
  position: relative;
  .avatar {
    position: absolute;
    width: 35px;
    height: 35px;
    left: -10px;
    bottom: 0;
    transform: translateX(-100%);
  }
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
  ${props => props.showBefore && css`
    &::before {
      border-bottom: 12px solid ${props => props.theme.colors.userMessage};
      left: -7px;
    }
  `}
  }

  &.partner {
    background-color: ${props => props.theme.colors.partnerMessage};
    ${props => props.showBefore && css`
      &::before {
        border-bottom: 12px solid ${props => props.theme.colors.partnerMessage};
        left: -7px;
      }
    `}
   
  }
`;

export const MessageText = styled.p`
  font-size: ${props => props.theme.fontSizes.normal};
  word-wrap: break-word;
`;