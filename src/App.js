import React  from "react";

import MainPage from "./pages/MainPage/MainPage";
import Theme from "./Theme";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage/LoginPage";
import { Routes, Route, Navigate } from "react-router-dom";
import DialogPage from "./pages/LoginPage/DialogPage/DialogPage";

function App() {
    const userId = useSelector(({user}) => user.id);

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
