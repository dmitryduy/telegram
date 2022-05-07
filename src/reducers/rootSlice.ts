
import { userReducer } from "./userSlice/userReducer";
import { dialogReducer } from "./dialogSlice/dialogSlice";
import { settingReducer } from "./settingsSlice/settingsSlice";
import { combineReducers } from "@reduxjs/toolkit";

const rootSlice = combineReducers({
    settings: settingReducer,
    user: userReducer,
    dialog: dialogReducer
});

export default rootSlice;
