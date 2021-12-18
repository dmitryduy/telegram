import styled from "styled-components";
import { rgba } from "polished";

export const ChatsSideContainer = styled.div`
  flex: 2;
  height: 100vh;
`;

export const ChatsSideHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 57px;
`;

export const Chats = styled.div`
  position: relative;
  overflow: auto;
  height: calc(100vh - 57px);
  overflow-x: hidden;

`;