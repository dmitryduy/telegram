import styled from 'styled-components';

export const TextAreaStyled = styled.textarea`
  outline: none;
  width: 100%;
  background-color: ${props => props.theme.colors.inputBackground};
  color: ${props => props.theme.colors.inputColor};
  border: none;
  font-size: ${props => props.theme.fontSizes.medium};
  resize: none;
  padding: 10px 0;
  &::-webkit-scrollbar {
    width: 0;
  }
`;