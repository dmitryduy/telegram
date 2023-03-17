import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.span`
  display: block;
  text-align: center;
  margin: 10px 0;
  font-size: ${props => props.theme.fontSizes.normal};
  color: ${props => props.theme.colors.paragraph};
`;

const NotFound: FC = ({children}) => {
  return (
    <Container>{children}</Container>
  );
};

export default NotFound;
