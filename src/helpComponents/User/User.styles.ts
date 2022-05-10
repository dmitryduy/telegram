import styled from "styled-components";

export const UserContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.helpingBorders};
  &.avatar-top {
    flex-direction: column;
    span[data-avatar] {
      margin-bottom: 10px;
    }
  }
  span[data-avatar] {
    position: relative;
    margin-right: 20px;
  }
  &.avatar-left {
    align-items: center;
  }
  .name {
    color: ${props => props.theme.colors.heading};
    margin-bottom: 5px;
  }
  .phone {
    font-size: ${props => props.theme.fontSizes.extraSmall};
    color: ${props => props.theme.colors.heading};
    font-weight: 500;
  }
  .nickname {
    position: relative;
    color: ${props => props.theme.colors.paragraph};
    font-size: ${props => props.theme.fontSizes.normal};
    cursor: pointer;
    &:hover {
      &:before {
        position: absolute;
        content: "";
        background-color: ${props => props.theme.colors.paragraph};
        bottom: 0;
        height: .5px;
        width: 100%;
      }
    }
  }
`;