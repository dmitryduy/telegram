import styled from 'styled-components';

export const Time = styled.span`
  position: relative;
  color: ${props => props.theme.colors.paragraph};
  font-size: ${props => props.theme.fontSizes.small};
  cursor: default;
  align-self: flex-end;
  float: right;
  margin-left: 5px;
  
`;

export const TimeTooltip = styled.span`
  position: absolute;
  z-index: 1;
  width: max-content;
  padding: 3px;
  border-radius: 3px;
  border: 1px solid ${props => props.theme.colors.timeTooltipBorder};
  bottom: -5px;
  right: -5px;
  transform: translateX(100%);
  background-color: ${props => props.theme.colors.partnerMessage};
  font-size: ${props => props.theme.fontSizes.extraSmall};
  opacity: 0;
  visibility: hidden;
  transition: ${props => props.theme.other.transitionSpeed};
  &.show {
    opacity: 1;
    visibility: visible;
  }
`;