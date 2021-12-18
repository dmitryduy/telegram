import React, { useCallback, useEffect, useState } from 'react';
import ChatsSide from "../../components/ChatsSide/ChatsSide";
import MessagesSide from "../../components/MessagesSide/MessagesSide";
import useSocket from "../../hooks/useSocket";
import { useSelector } from "react-redux";

const MainPage = () => {
     const initSocket = useSocket('joined');
     const userId = useSelector(({user}) => user.id);

    useEffect(() => {
        initSocket.emit(userId);
    }, []);


    return (
        <div style={{display: 'flex'}}>
            <ChatsSide/>
             <MessagesSide/>
        </div>
    );
};

export default MainPage;
