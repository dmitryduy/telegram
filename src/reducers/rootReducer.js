import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import userReducer from "./userReducer";
import dialogReducer from "./dialogReducer";

const rootReducer = combineReducers({
    settings: settingsReducer,
    user: userReducer,
    dialog: dialogReducer
});

export default rootReducer;