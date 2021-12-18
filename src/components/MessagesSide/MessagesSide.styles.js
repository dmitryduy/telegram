import styled from "styled-components";
import {rgba} from "polished";


export const MessagesSideContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 3;
  background-image: url("https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 100vh;
  &.content {
    display: block;
  }
`;

export const NoContent = styled.span`
  color: #fff;
  font-size: ${props => props.theme.fontSizes.normal};
  padding: 5px;
  background-color: ${props => rgba( props.theme.colors.darkGray, .2)};
  border-radius: 10px;
`;

export const Messages = styled.div`
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 60px);
  
  margin-bottom: 5px;
  padding: 0 20px;
  overflow: auto;
`;