import styled from "styled-components";

export const PopupBackground = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10000;
  background-color: rgba(0, 0, 0, .5);
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export const PopupContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 25%;
  min-width: 350px;
  height: 80%;
  padding: 15px 10px;
  color: ${props => props.theme.colors.heading};
  background-color:${props => props.theme.colors.bgColor} ;
  border-radius: 5px;
`;