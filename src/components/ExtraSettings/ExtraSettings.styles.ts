import styled from "styled-components";


export const Main = styled.div`
  display: flex;
  width: 200%;
  transition: ${props => props.theme.other.transitionSpeed};
  &.right {
    transform: translateX(-50%);
  }
`;

export const LeftSide = styled.div`
  width: 50%;
  &.hide {
    max-height: 0;
  }
`;

export const RightSide = styled.div`
  width: 50%;
`;