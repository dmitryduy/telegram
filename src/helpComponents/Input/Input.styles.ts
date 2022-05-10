import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  border-bottom: 1px solid ${props => props.theme.colors.inputBorder};
  width: 100%;

  span {
    position: absolute;
    left: 0;
    color: ${props => props.theme.colors.placeholder};
    font-size: ${props => props.theme.fontSizes.normal};
    pointer-events: none;
    transition: ${props => props.theme.other.transitionSpeed};

    &.hidden {
      transform: translateX(20px);
      opacity: 0;
    }
  }

  .hidden {
    transform: translateY(-50%) rotateZ(180deg) scale(0);
  }

  input, textarea {
    outline: none;
    background-color: ${props => props.theme.colors.inputBackground};
    color: ${props => props.theme.colors.inputColor};
    border: none;
    font-size: ${props => props.theme.fontSizes.extraMedium};
  }
  textarea {
    resize: none;
    overflow: hidden;
    font-size: ${props => props.theme.fontSizes.normal};
  }
`;
