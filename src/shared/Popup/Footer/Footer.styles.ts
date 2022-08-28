import styled from "styled-components";

export const FooterStyled = styled.footer`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px ${props => props.theme.other.popupSidePadding};
  background-color: ${props => props.theme.colors.bgColor};
`;