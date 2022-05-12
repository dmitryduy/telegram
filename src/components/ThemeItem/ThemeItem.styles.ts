import styled from "styled-components";

export const ThemeItemContainer = styled.div<{ beforeColor: string, afterColor: string }>`
  position: relative;
  border-radius: 5px;
  height: 115px;
  width: 80px;
  margin-bottom: 5px;
  cursor: pointer;

  &:before, &:after {
    position: absolute;
    content: '';
    width: 40px;
    height: 15px;
    border-radius: 2px;
  }

  &:before {
    background-color: ${props => props.beforeColor};
    top: 15px;
    left: 5px;
  }

  &:after {
    background-color: ${props => props.afterColor};
    top: 35px;
    right: 5px;
  }
  // radiobutton
  label {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 15px;
  }
`;

export const ThemeNameTooltip = styled.span`
  cursor: pointer;
  text-align: center;
  font-size: ${props => props.theme.fontSizes.normal};
  color: ${props => props.theme.colors.paragraph};
  transform: ${props => props.theme.other.transitionSpeed};
`;