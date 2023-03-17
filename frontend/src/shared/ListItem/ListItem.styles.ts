import styled from 'styled-components';

export const ListItemStyled = styled.li`
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${props => props.theme.colors.bgColor};
  padding: 7px ${props => props.theme.other.popupSidePadding};
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: ${props => props.theme.colors.chatItemHover};
  }
  
  .left-side {
    display: flex;
    align-items: center;
    margin-right: 15px;
  }
`;

export const MainContent = styled.div`
  display: flex;
  flex: 1;
  
  .text {
    color: ${props => props.theme.colors.heading};
  }

  .subtext {
    margin-left: 10px;
    color: ${props => props.theme.colors.placeholder};
  }

  &.column {
    flex-direction: column;

    .subtext {
      margin-left: 0;
    }
  }
`;