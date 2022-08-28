import styled from 'styled-components';

export const PartnerInfoContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 57px;
  top: 0;
  background-color: ${props => props.theme.colors.bgColor};
  padding: 5px 10px;
  border-bottom: 1px solid ${props => props.theme.colors.helpingBorders};
  h5 {
    font-size: ${props => props.theme.fontSizes.normal};
    color: ${props => props.theme.colors.heading};
    font-weight: 600;
  }
  span {
    color: ${props => props.theme.colors.paragraph};
    font-size: ${props => props.theme.fontSizes.extraSmall};
  }
`;
