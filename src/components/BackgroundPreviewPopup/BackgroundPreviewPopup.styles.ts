import styled from "styled-components";

export const BackgroundPreviewContainer = styled.div`
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 400px;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 10px;
    display: flex;
    flex-direction: column;
    margin-top: auto;
    padding: 5px 20px;
    justify-content: flex-start;
  }
`;