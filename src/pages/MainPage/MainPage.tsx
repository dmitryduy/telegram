import React, { useEffect } from 'react';
import ChatsSide from "../../components/ChatsSide/ChatsSide";
import MessagesSide from "../../components/MessagesSide/MessagesSide";
import useSocket from "../../hooks/useSocket";
import Settings from "../../components/Settings/Settings";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const MainPage: React.FC = () => {
    const initSocket = useSocket('joined');
    const userPhone = useTypedSelector(({user}) => user.phoneNumber);


    useEffect(() => {
        initSocket.emit(userPhone);
    }, []);


    return (
        <div style={{display: 'flex'}}>
            <ChatsSide/>
            <MessagesSide/>
            <Settings/>
        </div>
    );
};

export default MainPage;
