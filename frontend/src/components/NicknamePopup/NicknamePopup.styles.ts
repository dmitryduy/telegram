import styled from 'styled-components';

export const NicknamePopupContainer = styled.div`
  background-color: ${props => props.theme.colors.bgColor};
  padding: 0 ${props => props.theme.other.popupPaddings};
  p {
    font-size: ${props => props.theme.fontSizes.extraSmall};
    padding-bottom: 15px;
    color: ${props => props.theme.colors.heading};
    &.error {
      color: ${props => props.theme.colors.error};
    }
    &.neutral{
      color: ${props => props.theme.colors.paragraph};
    }
    &.success {
      color: ${props => props.theme.colors.success};
    }
  }
`;