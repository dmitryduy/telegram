import React  from "react";

import MainPage from "./pages/MainPage/MainPage";
import Theme from "./Theme";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAppSelector } from "@hooks/useAppSelector";
import { Emitter } from "@helpers/emitter";

window.emitter = new Emitter;

function App() {
    const isAuth = useAppSelector(state => state.user.isAuth);

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
