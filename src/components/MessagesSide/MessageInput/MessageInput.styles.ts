import styled from 'styled-components';


export const MessageInputContainer = styled.div`
  display: flex;
  padding: 5px 10px;
  align-items: center;
  width: 100%;
  background-color: ${props => props.theme.colors.bgColor};
  
  .send-button {
    clip-path: polygon(9% 44%, 0 0, 100% 50%, 0 100%, 9% 51%, 63% 51%, 63% 44%);
    background-color: ${props => props.theme.colors.blue};
    width: 25px;
    height: 25px;
    outline: none;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transform: scale(0);
    margin-bottom: 6px;
    transition: .1s linear;
    align-self: flex-end;
    margin-left: 10px;
    
    &.show {
      opacity: 1;
      visibility: visible;
      transform: scale(1);
    }
  }
`;