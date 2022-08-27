import styled from "styled-components";

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  transition: ${props => props.theme.other.transitionSpeed};

  &.active {
    opacity: 1;
    pointer-events: visible;
  }

  &.hidden {
    opacity: 0;
    pointer-events: none;
  }
`;


export const ContentStyled = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  background-color: ${props => props.theme.colors.popupBg};
  border-radius: ${props => props.theme.other.borderRadius};
  overflow: hidden;
  max-height: calc(100vh - 50px);
  max-width: 380px;
  transition: ${props => props.theme.other.transitionSpeed};
`;