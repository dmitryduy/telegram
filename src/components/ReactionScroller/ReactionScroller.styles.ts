import styled from 'styled-components';


export const Scroller = styled.div`
  display: flex;
  position: absolute;
  background-color: ${props => props.theme.colors.partnerMessage};
  max-height: 22px;
  min-width: 22px;
  max-width: 22px;
  border-radius: 10px;
  left: 100%;
  bottom: 0;
  transform: translateX(-3px);
  transition: ${props => props.theme.other.transitionSpeed};
  overflow: hidden;
  opacity: 0;
  visibility: hidden;

  .reaction + .reaction {
    margin: 0 2px;
  }

  &.show {
    opacity: 1;
    visibility: visible;
  }

  &.open {
    min-width: 130px;
    max-height: 29px;
    padding: 3px 0;
  }

`;