import React, { useEffect } from "react";

import MainPage from "./pages/MainPage/MainPage";
import Theme from "./Theme";
import { useDispatch } from "react-redux";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import useSocket from "./hooks/useSocket";
import {
    addNewMessageAC,
    sendOnlineUserAC,
    setOfflineUserAC
} from "./reducers/dialogReducer/dialogReducer";
import { useTypedSelector } from "./hooks/useTypedSelector";
import { phone, timestamp } from "../backend/types";
import { INewMessage } from "./reducers/dialogReducer/types";

function App() {
    const isAuth = useTypedSelector(({user}) => user.isAuth);
    const newMessageSocket = useSocket('new message');
    const offlineUserSocket = useSocket('user offline');
    const onlineUserSocket = useSocket('user online');
    const dispatch = useDispatch();

    useEffect(() => {
        newMessageSocket.on((message: INewMessage)=> {
            dispatch(addNewMessageAC(message));
        });
        offlineUserSocket.on(({userPhone, userLastSeen}: {userPhone: phone, userLastSeen: timestamp}) => {
            dispatch(setOfflineUserAC(userPhone, userLastSeen));
        })
        onlineUserSocket.on((userPhone: phone) => {
            dispatch(sendOnlineUserAC(userPhone));
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
                    <Route path={`${isAuth ? '/': '/login'}`} element={isAuth? <MainPage/>: <LoginPage/>}/>
                    <Route path='/login' element={<LoginPage/>}/>
                    <Route path='*' element={<Navigate to='/login'/>}/>
                </Routes>
            </div>
        </Theme>

    );
}

export default App;
