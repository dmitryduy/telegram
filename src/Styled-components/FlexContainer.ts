import styled from "styled-components";
import * as CSS from 'csstype';


interface IFlexContainerProps {
    justify: CSS.Property.JustifyContent,
    marginBottom: CSS.Property.MarginBottom,
    direction: CSS.Property.FlexDirection
}

export const FlexContainer = styled.div<Partial<IFlexContainerProps>>`
  display: flex;
  justify-content: ${props => props.justify || 'normal'};
  flex-direction: ${props => props.direction || 'row'};
  margin-bottom: ${props => props.marginBottom || 0};
  
`;