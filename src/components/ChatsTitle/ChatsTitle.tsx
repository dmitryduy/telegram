import React from 'react';
import { ChatsTitleContainer } from './ChatsTitle.styles';

const ChatsTitle = ({title}: {title: string}) => {
    return (
        <ChatsTitleContainer>{title}</ChatsTitleContainer>
    );
};

export default ChatsTitle;
