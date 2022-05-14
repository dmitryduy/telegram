import styled from "styled-components";
import { Scroll } from "@styled-components/Scroll";

export const BackgroundsContainer = styled(Scroll)<{color: string}>`
  display: grid;
  background-color: ${props => props.theme.colors.bgColor};
  padding: 0 10px;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  overflow: auto;
  max-height: min(450px, 75vh);
  span {
    position: relative;
    height: 180px;
    &.active-image:before {
      position: absolute;
      border: 3px solid #fff;
      color: #fff;
      content: '✔';
      text-align: center;
      width: 30px;
      height: 30px;
      bottom: 5px;
      right: 5px;
      border-radius: 50%;
      background-color: ${props => props.color};
    }
  }
 
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }
`;