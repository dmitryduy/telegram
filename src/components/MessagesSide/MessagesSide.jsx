import React from 'react';
import { MessagesSideContainer, NoContent } from "./MessagesSide.styles";

const MessagesSide = ({children}) => {
    return (
        <MessagesSideContainer>
            {children ? children: <NoContent>Select a chat to start messaging</NoContent>}
        </MessagesSideContainer>
    );
};

export default MessagesSide;
