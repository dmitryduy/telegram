import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  padding: 10px;
  height: 100px;
  span[data-avatar] {
    position: relative;
    height: 80px;
    width: 80px;
    margin-right: 20px;
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