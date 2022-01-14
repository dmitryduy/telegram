import styled from "styled-components";


export const MessageInputContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 55px;
  width: 100%;
  background-color: ${props => props.theme.colors.bgColor};
  input {
    padding: 7px 10px 7px 20px;
    height: 100%;
    width: 95%;
    outline: none;
    border: none;
    color: ${props => props.theme.colors.inputColor};
    background-color: ${props => props.theme.colors.inputBackground};
  }
  button {
    outline: none;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    background-color: transparent;
    transform: scale(0);
    transition: .1s linear;
    
    img {
     transform: scale(1.4);
      &:hover {
        transform: scale(1.5);
      }
    }
    &.show {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }
`;