import styled from 'styled-components';
import { rgba } from 'polished';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.bgColor};
`;


export const LoginTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes.medium};
  margin-bottom: 5px;
  color: ${props => props.theme.colors.heading};

`;

export const LoginSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.extraNormal};
  color: ${props => props.theme.colors.paragraph};
  width: 300px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  outline: none;
  border: none;
  border-bottom: 1px solid ${props => props.theme.colors.inputBorder};
  padding: 7px;
  background-color: ${props => props.theme.colors.inputBackground};
  font-size: ${props => props.theme.fontSizes.extraMedium};
  letter-spacing: 2px;
  color: ${props => props.theme.colors.inputColor};
  &:focus {
    border-bottom: 1px solid ${props => props.theme.colors.inputFocusBorder};
  }
`;

export const CountryCodeInput = styled(Input)`
  width: 80px;
  margin-right: 10px;
`;

export const NumberInput = styled(Input)``;


export const PhoneError = styled.span`
  display: block;
  margin: 10px 0;
  height: 15px;
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.error};
  visibility: hidden;
  transition: .2s;
  opacity: 0;
  &.visible {
    opacity: 1;
    visibility: visible;
  }
`;

export const LoginButton = styled.button`
  width: 100%;
  outline: none;
  background-color: ${props => props.theme.colors.button};
  color: #fff;
  border: none;
  padding: 20px;
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSizes.extraMedium};
  cursor: pointer;
  transition: .1s;
  font-weight: 500;
  &:hover {
    background-color: ${props => rgba(props.theme.colors.button, .95)};
  }
`;