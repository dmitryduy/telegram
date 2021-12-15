import React from "react";

import MainPage from "./pages/MainPage/MainPage";
import Theme from "./Theme";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
    return (
        <Theme>
            <Provider store={store}>
                <div className="App">
                    <MainPage/>
                </div>
            </Provider>
        </Theme>
    );
}

export default App;
