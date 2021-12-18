import styled from "styled-components";
import { rgba } from "polished";

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;


export const LoginTitle = styled.h1`
  font-size: ${props => props.theme.fontSizes.medium};
  margin-bottom: 5px;
  
`;

export const LoginSubtitle = styled.p`
  font-size: ${props => props.theme.fontSizes.extraNormal};
  color: ${props => props.theme.colors.darkGray};
  width: 300px;
  margin-bottom: 20px;
`;

const Input = styled.input.attrs({
    type: 'tel'
})`
  outline: none;
  border: none;
  border-bottom: 2px solid ${props => props.theme.colors.blue};
  padding: 7px;
  font-size: ${props => props.theme.fontSizes.extraMedium};
  letter-spacing: 2px;
`;

export const CountryCodeInput = styled(Input)`
  width: 70px;
  margin-right: 10px;
`;

export const NumberInput = styled(Input).attrs({
    placeholder: '--- --- ----'
})`
  transition: .2s;
    &.error {
      border-bottom: 2px solid ${props => props.theme.colors.error};
    }
`;


export const PhoneError = styled.span`
  display: inline-block;
  margin: 10px 0;
  font-size: ${props => props.theme.fontSizes.small};
  color: ${props => props.theme.colors.darkGray};
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
  background-color: ${props => props.theme.colors.darkBlue};
  color: #fff;
  border: none;
  padding: 10px;
  text-transform: uppercase;
  font-size: ${props => props.theme.fontSizes.extraMedium};
  cursor: pointer;
  transition: .1s;
  font-weight: 500;
  &:hover {
    background-color: ${props =>rgba(props.theme.colors.darkBlue, .95)};
  }
`;