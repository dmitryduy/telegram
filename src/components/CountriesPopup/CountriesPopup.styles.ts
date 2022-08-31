import styled from 'styled-components';
import { Scroll } from '@styled-components/Scroll';

export const CountriesContainer = styled(Scroll)`
  overflow: auto;
  height: 55vh;
  background-color: ${props => props.theme.colors.bgColor};
`;