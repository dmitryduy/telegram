import styled from "styled-components";

export const SearchContainer = styled.div`
  position: relative;
  border-bottom: 1px solid ${props => props.theme.colors.inputBorder};
  padding: 5px ${props => props.theme.other.popupPaddings};
  svg {
    fill: ${props => props.theme.colors.searchIcon};
    transform: rotateZ(90deg);
    height: 16px;
  }
  span {
    position: absolute;
    left: calc(26px + ${props => props.theme.other.popupPaddings});
    top: 50%;
    transform: translateY(-50%);
    color: ${props => props.theme.colors.placeholder};
    font-size: ${props => props.theme.fontSizes.normal};
    pointer-events: none;
    transition: ${props => props.theme.other.transitionSpeed};
    &.hidden {
      transform: translateX(20px) translateY(-50%);
      opacity: 0;
    }
  }
  
  .close {
    position: absolute;
    right: 15px;
    background-color: transparent;
    border: none;
    font-size: 25px;
    color: ${props => props.theme.colors.placeholder};
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: ${props => props.theme.other.transitionFast};
    &.hidden {
      transform: translateY(-50%) rotateZ(180deg) scale(0);
    }
  }
  
  input {
    outline: none;
    background-color: ${props => props.theme.colors.inputBackground};
    color: ${props => props.theme.colors.inputColor};
    border: none;
    font-size: ${props => props.theme.fontSizes.extraMedium};
  }
`;