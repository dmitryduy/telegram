import styled from "styled-components";
export const BioContainer = styled.div`
  display: flex;
  justify-content: space-between;
  box-shadow: 0 5px 6px -3px rgba(34, 60, 80, 0.22);
  padding: 0 ${props => props.theme.other.popupPaddings} 10px;
  position: relative;
  z-index: 1;
  textarea {
    height: 60px;
    width: 100%;
  }
`;

export const LettersCounter = styled.span`
  width: 25px;
  text-align: right;
  font-size: ${props => props.theme.fontSizes.normal};
  color: ${props => props.theme.colors.paragraph};
`;