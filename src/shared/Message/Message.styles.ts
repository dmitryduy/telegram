import styled, { css } from 'styled-components';

export const MessageStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 5px 0;
`;

export const MessageContent = styled.div<{ decorate: boolean }>`
  max-width: min(90%, 500px);
  padding: 7px 10px;
  border-radius: 7px;
  position: relative;

  .text {
    color: ${props => props.theme.colors.heading};
    font-size: ${props => props.theme.fontSizes.medium};
    word-break: break-all;
  }

  .date {
    font-size: ${props => props.theme.fontSizes.small};
    color: ${props => props.theme.colors.paragraph};
    transform: translateY(7px);
    margin-left: 5px;
    float: right;
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

  &.user {
    margin-left: auto;
    background-color: ${props => props.theme.colors.userMessage};
    margin-right: 7px;
    ${props => props.decorate && css`
      &::before {
        border-bottom: 12px solid ${props => props.theme.colors.userMessage};
        right: -7px;
      }
    `}
  }

  &.partner {
    background-color: ${props => props.theme.colors.partnerMessage};
    margin-left: 7px;
    ${props => props.decorate && css`
      &::before {
        border-bottom: 12px solid ${props => props.theme.colors.partnerMessage};
        left: -7px;
      }
    `}

  }
`;