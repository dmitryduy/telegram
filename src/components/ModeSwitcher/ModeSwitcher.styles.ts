import styled from 'styled-components';

export const Switcher = styled.span<{color: string}>`
  position: relative;
  display: inline-block;
  width: 24px;
  height: 16px;
  margin-left: auto;
  background-color: ${props => props.theme.colors.switcher};
  border-radius: 10px;

  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    top: -2px;
    left: calc(-10px + 2px);
    border-radius: 50%;
    background-color: ${props => props.theme.colors.switcherTumbler};
    border: 2px solid ${props => props.theme.colors.switcher};
    transition: ${props => props.theme.other.transitionSpeed};
  }

  &.night-mode {
    background-color: ${props => props.color};
    &:after {
      left: calc(24px - 2px - 10px);
      border: 2px solid  ${props => props.color};
    }
  }
`;