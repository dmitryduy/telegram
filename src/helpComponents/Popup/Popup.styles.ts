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


export const Content = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 50%;
  top: 50px;
  transform: translateX(-50%);
  width: 320px;
  background-color: ${props => props.theme.colors.popupBg};
  border-radius: ${props => props.theme.other.borderRadius};
  overflow: hidden;
  max-height: 75vh;
  transition: ${props => props.theme.other.transitionSpeed};
`;

export const Body = styled.div`
  height: calc(100% - 80px);
  flex: 1 0 auto;
  //border-bottom: 1px solid ${props => props.theme.colors.helpingBorders};
`;

export const Bottom = styled.div`
  display: flex;
  max-height: 50px;
  flex: 0 0 auto;
  margin-bottom: 0;
  justify-content: flex-end;
  align-items: center;
  padding: 10px ${props => props.theme.other.popupPaddings};
  background-color: ${props => props.theme.colors.bgColor};
`;