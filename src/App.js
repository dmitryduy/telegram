import React, { useEffect } from "react";

import MainPage from "./pages/MainPage/MainPage";
import Theme from "./Theme";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import useSocket from "./hooks/useSocket";
import { addReceiveMessageAC, sendOfflineUserAC, sendOnlineUserAC } from "./reducers/dialogReducer";

function App() {
    const userId = useSelector(({user}) => user.id);
    const newMessageSocket = useSocket('new message');
    const offlineUserSocket = useSocket('user offline');
    const onlineUserSocket = useSocket('user online');
    const dispatch = useDispatch();

    useEffect(() => {
        newMessageSocket.on((data) => {
            dispatch(addReceiveMessageAC(
                data.messageText, data.dialogId, data.timestamp, data.sender, data.senderNickname,
                data.senderOnline, data.senderLastSeen, data.senderPhoneNumber));
        });
        offlineUserSocket.on(({userNickname, lastSeen}) => {
            dispatch(sendOfflineUserAC(userNickname, lastSeen));
        })
        onlineUserSocket.on(({userNickname}) => {
            dispatch(sendOnlineUserAC(userNickname));
        })
        return () => {
            newMessageSocket.off();
            offlineUserSocket.off();
            onlineUserSocket.off();
        }
    }, []);

    return (
        <Theme>
            <div className="App">
                <Routes>
                    {userId ?
                        <>
                            <Route exact path='/' element={<MainPage/>}/>
                        </>
                        : <>
                            <Route path='/login' exact element={<LoginPage/>}/>
                            <Route exact path='*' element={<Navigate to='/login'/>}/>
                        </>
                    }
                </Routes>
            </div>
        </Theme>

    );
}

export default App;
