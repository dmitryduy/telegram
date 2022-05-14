import styled from "styled-components";
import { rgba } from "polished";

export const Scroll = styled.div`
  &::-webkit-scrollbar {
    width: 4px;
    background-color: ${props => rgba(props.theme.colors.scrollbar, .5)};
    border-radius: 2px;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    background-color: ${props => rgba(props.theme.colors.thumb, .8)};
    border-radius: 2px;
    &:hover {
      background-color: ${props => rgba(props.theme.colors.thumb, 1)};
    }
  }
`;