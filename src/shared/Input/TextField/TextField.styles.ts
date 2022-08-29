import styled from 'styled-components';

export const TextFieldStyled = styled.div<{ themeColor: string }>`
  background-color: ${props => props.theme.colors.bgColor};
  width: 100%;

  .placeholder {
    transition: ${props => props.theme.other.transitionSpeed};
    font-weight: 500;
    font-size: ${props => props.theme.fontSizes.normal};
    position: absolute;
    pointer-events: none;
    color: ${props => props.theme.colors.paragraph};

    &.animate {
      transform: translateY(-15px);
      color: ${props => props.themeColor};
      font-size: ${props => props.theme.fontSizes.small};
    }

    &.error {
      color: ${props => props.theme.colors.error};
    }

    &.not-active {
      color: ${props => props.theme.colors.paragraph};
    }

  }

  div.input {
    position: relative;
    padding-top: 20px;

    &:after {
      content: '';
      position: absolute;
      background-color: ${props => props.themeColor};
      height: 2px;
      bottom: 0;
      width: 0;
      left: 50%;
      transform: translateX(-50%);
      transition: ${props => props.theme.other.transitionSpeed};
    }

    &.animate {
      &:after {
        width: 100%;
      }
    }

    &.error {
      &:after {
        background-color: ${props => props.theme.colors.error};
      }
    }
  }

  input {
    width: 100%;
    border: none;
    padding-bottom: 5px;
    font-size: ${props => props.theme.fontSizes.extraNormal};
    outline: none;
    border-bottom: 1px solid ${props => props.theme.colors.helpingBorders};
    background-color: ${props => props.theme.colors.inputBackground};
    color: ${props => props.theme.colors.inputColor};
  }
`;