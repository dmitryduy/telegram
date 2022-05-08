import styled from "styled-components";


export const CountriesContainer = styled.div`
  position: relative;
  padding: 5px 0;
  border-bottom: 2px solid ${props => props.theme.colors.inputBorder};
  margin-bottom: 20px;
  cursor: pointer;
  
  svg {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    fill: ${props => props.theme.colors.inputColor}
  }
`;