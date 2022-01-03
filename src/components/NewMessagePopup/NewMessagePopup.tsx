import React, { Dispatch, SetStateAction } from 'react';
import { INewMessagePopup } from "../../globalTypes";
import { NewMessagePopupContainer, CloseButton, Nickname, MessageText } from './NewMessagePopup.styles';

import closeButton from '../../assets/imgs/close-icon.png';
import useAnimation from "../../hooks/useAnimation";

interface INewMessagePopupProps {
    newMessage: INewMessagePopup | null,
    setNewMessage: Dispatch<SetStateAction<INewMessagePopup | null>>
}


const NewMessagePopup: React.FC<INewMessagePopupProps> = ({newMessage, setNewMessage}) => {
    const [animate, setAnimate] = useAnimation(1000);

    if (!newMessage) {
        return null;
    }

    const removePopup = () => {
        setAnimate()
        setTimeout(() => setNewMessage(null), 1000);
    }

    return (
        <NewMessagePopupContainer className={animate? 'disappear': ''}>
            <img src={newMessage.partnerAvatar} alt={newMessage.partnerNickname}/>
            <div style={{flex: 1}}>
                <Nickname> <CloseButton src={closeButton} onClick={removePopup}/>{newMessage.partnerNickname}</Nickname>
                <MessageText>{newMessage.text}</MessageText>
            </div>
        </NewMessagePopupContainer>
    );
};

export default NewMessagePopup;
