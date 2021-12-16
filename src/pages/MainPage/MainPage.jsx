import React, { useCallback, useEffect, useState } from 'react';
import ChatsSide from "../../components/ChatsSide/ChatsSide";
import MessagesSide from "../../components/MessagesSide/MessagesSide";

const MainPage = () => {

    return (
        <div style={{display: 'flex'}}>
            <ChatsSide/>
             <MessagesSide/>
        </div>
    );
};

export default MainPage;
