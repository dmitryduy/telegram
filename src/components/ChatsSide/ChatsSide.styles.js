import styled from "styled-components";
import { rgba } from "polished";

export const ChatsSideContainer = styled.div`
  flex: 1;
  height: 100vh;
  margin-right: 2px;
`;

export const ChatsSideHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 57px;
`;

export const Chats = styled.div`
  position: relative;
  width: calc(100% - 4px);
  overflow: auto;
  height: calc(100vh - 57px);
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: ${props => rgba(props.theme.colors.darkGray, .5)};
    border-radius: 2px;
    transition: .2s;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    background-color: ${props => rgba(props.theme.colors.darkGray, .8)};
    border-radius: 2px;
    &:hover {
      background-color: ${props => rgba(props.theme.colors.darkGray, 1)};
    }
  }

`;