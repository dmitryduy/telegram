
import { userReducer } from "./userSlice/userReducer";
import { dialogReducer } from "./dialogSlice/dialogSlice";
import { settingReducer } from "./settingsSlice/settingsSlice";
import { combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "./loginSlice/loginSlice";

const rootSlice = combineReducers({
    settings: settingReducer,
    user: userReducer,
    dialog: dialogReducer,
    login: loginReducer
});

export default rootSlice;
