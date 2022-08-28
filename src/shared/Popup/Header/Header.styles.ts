import styled from "styled-components";

export const HeaderStyled = styled.header`
  color: ${props => props.theme.colors.heading};
  background-color: ${props => props.theme.colors.bgColor};
  font-weight: 600;
  padding: 10px ${props => props.theme.other.popupSidePadding} 0;


  .title {
    display: flex;
    align-items: center;
    padding-bottom: 10px;
  }

  .extra-content {
    margin-bottom: 5px;
  }

  svg {
    display: flex;
    align-items: center;
    fill: ${props => props.theme.colors.icons};
    height: 20px;
    width: 20px;
    cursor: pointer;
  }

  h2 {
    flex: 1;
    font-size: ${props => props.theme.fontSizes.medium};
  }

  .back-icon {
    margin-right: 20px;
  }

  .more-icon {
    transform: rotate(90deg);
    margin-right: 20px;
  }
`;