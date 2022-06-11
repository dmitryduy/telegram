import styled from "styled-components";


export const ChatsSideContainer = styled.div<{isPhone: boolean}>`
  height: 100%;
  width: ${props => props.isPhone ? '100vw': '300px'};
  background-color: ${props => props.theme.colors.bgColor};
  border-right: 1px solid  ${props => props.theme.colors.helpingBorders};
  transition: ${props => props.theme.other.transitionSpeedSlow};
  
  &.hidden {
    transform: translateX(-30%);
  }
`;

export const ChatsSideHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 57px;
`;

export const ChatsContainer = styled.div`
  position: relative;
  overflow: auto;
  height: calc(100vh - 57px);
  overflow-x: hidden;
`;