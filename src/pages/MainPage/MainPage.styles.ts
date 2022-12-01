import styled from 'styled-components';

export const MainPageStyled = styled.div<{isPhone: boolean}>`
  display: flex;
  width: ${props => (props.isPhone ? '200vw' : 'auto')};
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
