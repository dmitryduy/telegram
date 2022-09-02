import styled from 'styled-components';

export const DialogStyled = styled.li<{ themeColor: string }>`
  width: 100%;
  padding: 10px;
  display: flex;
  align-items: center;
  height: 80px;
  cursor: pointer;
  transition: .1s;
  user-select: none;

  &:hover {
    background-color: ${props => props.theme.colors.chatItemHover};
  }

  &.active {
    background-color: ${props => props.themeColor};

    .title, .text, .time {
      color: #fff;
    }
    
    .unread-count {
      background-color: #fff;
      color: ${props => props.themeColor};
    }
  }

  .avatar {
    position: relative;

    &:before {
      position: absolute;
      content: '';
      border-radius: 50%;
      width: 13px;
      height: 13px;
      bottom: 0;
      right: 0;
      border: 2px solid #fff;
      background-color: ${props => props.themeColor};
    }
  }
`;

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 1px;

  .title {
    font-weight: 600;
    font-size: ${props => props.theme.fontSizes.extraNormal};
    color: ${props => props.theme.colors.heading};
    margin-bottom: 5px;
    flex: 1;
  }

  .text {
    flex: 1;
    width: 100%;
    font-size: ${props => props.theme.fontSizes.extraNormal};
    color: ${props => props.theme.colors.paragraph};
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;

export const ExtraContent = styled.div<{ themeColor: string }>`
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  .time {
    color: ${props => props.theme.colors.paragraph};
    font-size: ${props => props.theme.fontSizes.normal};
    margin-bottom: 5px;
  }

  .unread-count {
    display: flex;
    justify-content: center;
    width: fit-content;
    align-items: center;
    min-width: 20px;
    height: 20px;
    color: #fff;
    padding: 0 5px;
    background-color: ${props => props.themeColor};
    border-radius: 10px/ 50%;
    font-size: ${props => props.theme.fontSizes.small};
  }
`;