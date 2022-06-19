import React  from "react";

import Theme from "./Theme";
import { Routes, Route, Navigate } from "react-router-dom";
import { Emitter } from "@helpers/emitter";
import { LocalStorage } from "@helpers/localStorage";
import {Suspense} from 'react';

window.emitter = new Emitter();
window.storage = new LocalStorage();

const MainPage = React.lazy(() => import('./pages/MainPage/MainPage'));
const LoginPage = React.lazy(() => import('./pages/LoginPage/LoginPage'));

function App() {
    return (
        <Theme>
            <div className="App">
                <Suspense fallback={<div>loading...</div>}>
                <Routes>
                        <Route path='/' element={<MainPage/>}/>
                        <Route path='/login' element={<LoginPage/>}/>
                        <Route path='*' element={<Navigate to='/'/>}/>
                </Routes>
                </Suspense>
            </div>
        </Theme>

    );
}

export default App;
