import styled from "styled-components";

export const SearchStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 5px;

  svg {
    width: 20px;
    height: 20px;
    fill: ${props => props.theme.colors.icons};
  }

  .search-icon {
    position: relative;
    top: 2px;
    margin-right: 10px;
  }

  .times-icon {
    cursor: pointer;
  }

  .times-container {
    margin-left: 10px;
    width: 20px;
    height: 20px;
    transition: ${props => props.theme.other.transitionSpeedSlow};
    transform-origin: center;
    transform: rotate(90deg) scale(0);

    &.visible {
      transform: rotate(0deg) scale(1);

    }
  }

`;

export const InputStyled = styled.div<{borderColor: string}>`
  flex: 1;
  position: relative;

  input {
    width: 100%;
    outline: none;
    border: none;
    font-size: ${props => props.theme.fontSizes.extraMedium};
    padding: 10px 0;
    color: ${props => props.theme.colors.inputColor};
  }

  .placeholder {
    position: absolute;
    left: 0;
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

  &.bordered {
    .placeholder {
      left: 8px;
    }

    input {
      border-radius: 5px;
      padding: 7px;
      background-color: ${props => props.theme.colors.searchInputBackground};
      border: 2px solid transparent;
      transition: ${props => props.theme.other.transitionSpeed};

      &:focus {
        border: 2px solid ${props => props.borderColor};
        background-color: ${props => props.theme.colors.searchInputBackgroundActive};
      }
    }

  }
`;