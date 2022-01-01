import { combineReducers } from "redux";
import settingsReducer from "./settingsReducer";
import userReducer from "./userReducer/userReducer";
import dialogReducer from "./dialogReducer/dialogReducer";

const rootReducer = combineReducers({
    settings: settingsReducer,
    user: userReducer,
    dialog: dialogReducer
});

export default rootReducer;

export type rootState = ReturnType<typeof rootReducer>;