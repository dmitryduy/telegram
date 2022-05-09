import styled from "styled-components";


export const SettingsContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, .5);
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  transition: .3s;

  &.active {
    visibility: visible;
    opacity: 1;
  }
`;

export const SettingsContent = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 17%;
  background-color: ${props => props.theme.colors.bgColor};
  min-width: 150px;
  transition: .3s;
  transform: translateX(-100%);
  z-index: 10000;

  &.active {
    transform: translateX(0);
  }
`;

export const SettingsHeader = styled.div<{ backgroundImage: string }>`
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  padding: 20px 25px 10px;
  color: #fff;
  border-bottom: 1px solid ${props => props.theme.colors.helpingBorders};
`;

export const Mode = styled.img`
  position: absolute;
  width: 30px;
  height: 30px;
  right: 15px;
  bottom: 15px;
  cursor: pointer;
  transition: .2s;

  &:hover {
    transform: scale(1.1);
  }
`;


export const UserName = styled.h5`
  font-size: ${props => props.theme.fontSizes.normal};
  font-weight: 600;
  color: ${props => props.theme.colors.heading};
`;

export const UserPhone = styled.span`
  font-size: ${props => props.theme.fontSizes.extraSmall};
  color: ${props => props.theme.colors.paragraph};
`;