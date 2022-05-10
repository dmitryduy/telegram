import styled from "styled-components";

export const Container = styled.div`
  background-color: ${props => props.theme.colors.bgColor};
  .input-container {
    border-bottom: none;
  }
`;

export const Tip = styled.p`
  color: ${props => props.theme.colors.paragraph};
  padding: 5px ${props => props.theme.other.popupPaddings} 10px;
  font-size: ${props => props.theme.fontSizes.extraSmall};
  background-color: ${props => props.theme.colors.popupBg};
`;