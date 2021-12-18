import React, { useEffect } from "react";

import MainPage from "./pages/MainPage/MainPage";
import Theme from "./Theme";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import DialogPage from "./pages/LoginPage/DialogPage/DialogPage";
import useSocket from "./hooks/useSocket";
import { addMessageAC } from "./reducers/userReducer";

function App() {
    const userId = useSelector(({user}) => user.id);
    const newMessageSocket = useSocket('new message');
    const dispatch = useDispatch();

    useEffect(() => {
        newMessageSocket.on((data) => {
            dispatch(addMessageAC(data.messageText, data.dialogId, data.timestamp, data.sender));
        });
        return () => {
            newMessageSocket.off();
        }
    }, []);

    return (
        <Theme>
            <div className="App">
                <Routes>
                    {userId ?
                        <>
                            <Route exact path='/' element={<MainPage/>}/>
                            <Route path='/dialogs/:id' exact element={<DialogPage/>}/>
                        </>
                        :<>
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
