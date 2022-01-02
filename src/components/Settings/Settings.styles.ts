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
  width: 25%;
  background-color: #fff;
  transition: .3s;
  transform: translateX(-100%);
  z-index: 10000;
  &.active {
    transform: translateX(0);
  }
`;

export const SettingsHeader = styled.div`
  background-image: url("https://blog.1a23.com/wp-content/uploads/sites/2/2020/02/Desktop.png");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  padding: 20px;
  color: #fff;
  img {
    width: 50px;
    border-radius: 50%;
    margin-bottom: 15px;
  }
`;

export const UserName = styled.h5`
  font-size: ${props => props.theme.fontSizes.normal};
  font-weight: 600;
`;

export const UserPhone = styled.span`
  font-size: ${props => props.theme.fontSizes.extraSmall};
  font-weight: 300;
  letter-spacing: 1px;
`;