import styled from "styled-components";


export const MessageInputContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  bottom: 0;
  height: 55px;
  width: 100%;
  background-color: #fff;
  input {
    padding: 7px 10px 7px 20px;
    height: 100%;
    width: 95%;
    outline: none;
    border: none;
  }
  button {
    outline: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    transition: .2s linear;
    .show {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }
`;