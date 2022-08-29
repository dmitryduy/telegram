import styled from 'styled-components';

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-color: ${props => props.theme.colors.bgColor};

  .phone-container {
    display: flex;

    & > div:first-child {
      width: 80px;
      margin-right: 10px;
    }
  }
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

export const PhoneError = styled.div`
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