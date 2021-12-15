import React from 'react';
import SearchField from "../SearchField/SearchField";
import HamburgerMenuIcon from "../HamburgerMenuIcon/HamburgerMenuIcon";
import { Chats, ChatsSideContainer, ChatsSideHeader } from "./ChatsSide.styles";
import ChatItem from "../ChatItem/ChatItem";

const ChatsSide = () => {
    return (
        <ChatsSideContainer>
            <ChatsSideHeader>
                <HamburgerMenuIcon/>
                <SearchField/>
            </ChatsSideHeader>
            <Chats>
                <ChatItem
                    chatImage='http://www.dejurka.ru/wp-content/uploads/2017/07/project-preview-large.png'
                    chatName='Premius'
                    lastMsg='Я т ldsjfklds jfklasdjf ;sdj fkld;s jfasd; fjsdklf jsd;lfjasd;kl fjsda;kf sjd;lkf sdjf;kslfjупой'
                    lastMsgDate={1639576221406}
                />

                <ChatItem
                    chatImage='http://www.dejurka.ru/wp-content/uploads/2017/07/project-preview-large.png'
                    chatName='Premius'
                    lastMsg='Я т ldsjfklds jfklasdjf ;sdj fkld;s jfasd; fjsdklf jsd;lfjasd;kl fjsda;kf sjd;lkf sdjf;kslfjупой'
                    lastMsgDate={1639576221406}
                />
                <ChatItem
                    chatImage='http://www.dejurka.ru/wp-content/uploads/2017/07/project-preview-large.png'
                    chatName='Premius'
                    lastMsg='Я т ldsjfklds jfklasdjf ;sdj fkld;s jfasd; fjsdklf jsd;lfjasd;kl fjsda;kf sjd;lkf sdjf;kslfjупой'
                    lastMsgDate={1639576221406}
                />
                <ChatItem
                    chatImage='http://www.dejurka.ru/wp-content/uploads/2017/07/project-preview-large.png'
                    chatName='Premius'
                    lastMsg='Я т ldsjfklds jfklasdjf ;sdj fkld;s jfasd; fjsdklf jsd;lfjasd;kl fjsda;kf sjd;lkf sdjf;kslfjупой'
                    lastMsgDate={1639576221406}
                />
                <ChatItem
                    chatImage='http://www.dejurka.ru/wp-content/uploads/2017/07/project-preview-large.png'
                    chatName='Premius'
                    lastMsg='Я т ldsjfklds jfklasdjf ;sdj fkld;s jfasd; fjsdklf jsd;lfjasd;kl fjsda;kf sjd;lkf sdjf;kslfjупой'
                    lastMsgDate={1639576221406}
                />
                <ChatItem
                    chatImage='http://www.dejurka.ru/wp-content/uploads/2017/07/project-preview-large.png'
                    chatName='Premius'
                    lastMsg='Я т ldsjfklds jfklasdjf ;sdj fkld;s jfasd; fjsdklf jsd;lfjasd;kl fjsda;kf sjd;lkf sdjf;kslfjупой'
                    lastMsgDate={1639576221406}
                />
                <ChatItem
                    chatImage='http://www.dejurka.ru/wp-content/uploads/2017/07/project-preview-large.png'
                    chatName='Premius'
                    lastMsg='Я т ldsjfklds jfklasdjf ;sdj fkld;s jfasd; fjsdklf jsd;lfjasd;kl fjsda;kf sjd;lkf sdjf;kslfjупой'
                    lastMsgDate={1639576221406}
                />
            </Chats>

        </ChatsSideContainer>
    );
};

export default ChatsSide;
