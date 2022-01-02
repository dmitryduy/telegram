import styled, { css } from "styled-components";
import { rgba } from "polished";

export const NewDate = styled.div`
  position: sticky;
  top: 0;
  align-self: center;
  color: #fff;
  border-radius: 10px;
  background-color: ${props => rgba(props.theme.colors.darkGray, .35)};
  padding: 4px 7px;
  font-size: ${props => props.theme.fontSizes.normal};
`;

export const MessageContainer = styled.div<{isShowBefore: boolean}>`
  display: flex;
  max-width: 70%;
  margin: 2px 0;
  padding: 7px 10px;
  border-radius: 7px;
  align-items: flex-end;
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
    background-color: ${props => props.theme.colors.myMessageBg};
    align-self: flex-end;
  ${props => props.isShowBefore && css`
    &::before {
      border-bottom: 12px solid ${props => props.theme.colors.myMessageBg};
      right: -7px;
    }
  `}
  }

  &.partner {
    background-color: #fff;
    align-self: flex-start;
    ${props => props.isShowBefore && css`
      &::before {
        border-bottom: 12px solid #fff;
        left: -7px;
      }
    `}
   
  }
`;

export const MessageText = styled.span`
  margin-right: 7px;
  font-size: ${props => props.theme.fontSizes.normal};
  word-wrap: break-word;
`;

export const MessageTime = styled.span`
  color: ${props => props.theme.colors.green};
  font-size: ${props => props.theme.fontSizes.small};
`;