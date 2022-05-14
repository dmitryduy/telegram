import styled from "styled-components";

export const PopupItemContainer = styled.div`
  padding: 10px ${props => props.theme.other.popupPaddings};
  background-color: ${props => props.theme.colors.bgColor};
`;