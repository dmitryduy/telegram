import React, { useEffect } from "react";

import MainPage from "./pages/MainPage/MainPage";
import Theme from "./Theme";
import {  useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, useNavigate } from "react-router-dom";

function App() {
    const userId = useSelector(({user}) => user.id);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userId) {
            navigate('/login');
        }
        else {
            navigate('/');
        }
    }, [userId]);
    return (
        <Theme>
                <div className="App">
                    <Routes>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route exact path='/' element={<MainPage/>}/>
                    </Routes>
                    <LoginPage/>
                </div>
        </Theme>

);
}

export default App;
