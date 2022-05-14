import styled from "styled-components";

export const BackgroundImage = styled.img`
background-size: cover;
  margin-right: 20px;
  border-radius: 5px;
`;

export const ChooseContainer = styled.div`
  .themed-text {
    cursor: pointer;
    &:first-child {
      margin-bottom: 15px;
    }
    &:hover {
      text-decoration: underline;
    }
  }
`;