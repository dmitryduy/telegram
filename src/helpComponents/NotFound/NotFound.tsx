import React, { FC } from 'react';
import styled from "styled-components";

const Container = styled.span<{marginTop: number}>`
  display: block;
  text-align: center;
  margin-top: ${props => props.marginTop}px;
  font-size: ${props => props.theme.fontSizes.normal};
  color: ${props => props.theme.colors.paragraph};
`;

const NotFound: FC<{marginTop: number}> = ({children, marginTop}) => {
    return (
        <Container marginTop={marginTop}>{children}</Container>
    );
};

export default NotFound;
