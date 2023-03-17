import styled from 'styled-components';

export const ContentStyled = styled.main`
  &.bordered {
    border-bottom: 1px solid ${props => props.theme.colors.border};
    border-top: 1px solid ${props => props.theme.colors.border};
  }
  
  &.defaultStyles {
    padding: 0 ${props => props.theme.other.popupSidePadding};
    background-color: ${props => props.theme.colors.bgColor};
  }
`;
