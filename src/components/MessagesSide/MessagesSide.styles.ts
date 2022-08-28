import styled from 'styled-components';
import {rgba} from 'polished';

export const NoContent = styled.span`
  color: #fff;
  font-size: ${props => props.theme.fontSizes.normal};
  padding: 5px;
  background-color: ${props => rgba(props.theme.colors.bgColor, .2)};
  border-radius: 10px;
`;

export const Messages = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 55px;
  display: flex;
  flex-direction: column;
  max-height: calc(100% - 55px - 57px);
  margin-top: auto;
  padding: 5px 20px;
  justify-content: flex-start;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 4px;
    background-color: ${props => rgba(props.theme.colors.bgColor, .5)};
    border-radius: 2px;
    transition: .2s;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    background-color: ${props => rgba(props.theme.colors.bgColor, .8)};
    border-radius: 2px;
    &:hover {
      background-color: ${props => rgba(props.theme.colors.bgColor, 1)};
    }
  }
`;