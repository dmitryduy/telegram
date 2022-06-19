import styled from "styled-components";

export const UserContainer = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.helpingBorders};
  background-color: ${props => props.theme.colors.bgColor};
  margin-bottom: 5px;
  &.avatar-top {
    flex-direction: column;

    .avatar {
      margin-bottom: 10px;
    }
  }

  &.avatar-left {
    align-items: center;

    .avatar {
      margin-right: 20px;
    }
  }
  
  .info.center {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .name {
    color: ${props => props.theme.colors.heading};
    font-size: ${props => props.theme.fontSizes.medium};
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