import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    settings: settingsReducer,
    user: userReducer
});

export default rootReducer;