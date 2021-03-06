import React, { FC } from 'react';
import CloseButton from "../../helpComponents/CloseButton/CloseButton";
import styled from "styled-components";
import BackButton from "../../helpComponents/BackButton/BackButton";

export const Title = styled.h2`
  position: relative;
  display: flex;
  align-items: center;
  height: 20px;
  font-size: ${props => props.theme.fontSizes.medium};
  color: ${props => props.theme.colors.heading};
  background-color: ${props => props.theme.colors.bgColor};
  font-weight: 600;
  padding: 30px ${props => props.theme.other.popupPaddings} 20px;
`;

interface IPopupTitle {
    closeButton?: boolean,
    backButton?: boolean,
    closePopup: (e: React.FormEvent<HTMLElement>) => void,
    backEventName?: string
}

const PopupTitle: FC<IPopupTitle> = ({backEventName, children, closeButton, closePopup, backButton}) => {

    return <Title>{backButton && backEventName && <BackButton backEventName={backEventName}/>}{children} {closeButton &&
    <CloseButton onClick={closePopup}/>}</Title>

};

export default PopupTitle;
