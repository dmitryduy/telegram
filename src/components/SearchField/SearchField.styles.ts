import styled from "styled-components";


export const SearchInput = styled.input`
  outline: none;
  background-color: ${props => props.theme.colors.lightGray};
  border: 2px solid transparent;
  width: 100%;
  padding: 7px;
  border-radius: 5px;
  transition: .2s;
  font-size: ${props => props.theme.fontSizes.normal};

  &:focus {
    border: 2px solid ${props => props.theme.colors.blue};
    background-color: #fff;
  }
`;