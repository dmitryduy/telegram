import styled from "styled-components";


export const ChatsSideContainer = styled.div`
  flex: 2;
  height: 100%;
  background-color: ${props => props.theme.colors.bgColor};
  border-right: 1px solid  ${props => props.theme.colors.helpingBorders};;
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