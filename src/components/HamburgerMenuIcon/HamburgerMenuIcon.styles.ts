import styled from 'styled-components';


export const HamburgerContainer = styled.div`
  position: relative;
  width: 25px;
  height: 17px;
  margin-right: 10px;
  cursor: pointer;
  &:hover span{
    background-color: ${props => props.theme.colors.hamburgerHover};
  }
  span {
    position: absolute;
    display: inline-block;
    height: 4px;
    width: 100%;
    border-radius: 2px;
    background-color: ${props => props.theme.colors.hamburger};
    &:nth-child(2) {
      top: 6px;
    }
    &:nth-child(3) {
      top: 13px;
    }
  }
`;