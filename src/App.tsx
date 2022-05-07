import React from "react";

import MainPage from "./pages/MainPage/MainPage";
import Theme from "./Theme";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "./hooks/useAppSelector";


function App() {
    const isAuth = useAppSelector(({user}) => user.isAuth);
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
