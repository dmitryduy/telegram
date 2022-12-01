import styled from 'styled-components';

export const PartnerInfoStyled = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 45px;
  background-color: ${props => props.theme.colors.bgColor};
  padding: 5px 10px;
  border-bottom: 1px solid ${props => props.theme.colors.helpingBorders};
  border-radius: 0 0 10px 10px;
  
  .back-icon {
    width: 20px;
    height: 20px;
    margin-right: 20px;
    fill: ${props => props.theme.colors.icons};
    transform: rotate(180deg);
  }
  .main-info {
    display: flex;
    flex-direction: column;
  }

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
