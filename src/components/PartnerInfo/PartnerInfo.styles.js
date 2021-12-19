import styled from "styled-components";

export const PartnerInfoContainer = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 57px;
  top: 0;
  background-color: #fff;
  padding: 5px 10px;
  border-left: 1px solid ${props => props.theme.colors.lightGray};
  border-bottom: 1px solid ${props => props.theme.colors.lightGray};
  color: ${props => props.theme.colors.black};
  h5 {
    font-size: ${props => props.theme.fontSizes.normal};
    font-weight: 600;
  }
  span {
    color: ${props => props.theme.colors.darkGray};
    font-size: ${props => props.theme.fontSizes.extraSmall};
  }
`;
