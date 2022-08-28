
import { combineReducers } from '@reduxjs/toolkit';

import { userReducer } from './userSlice/userReducer';
import { dialogReducer } from './dialogSlice/dialogSlice';
import { settingReducer } from './settingsSlice/settingsSlice';
import { loginReducer } from './loginSlice/loginSlice';

const rootSlice = combineReducers({
  settings: settingReducer,
  user: userReducer,
  dialog: dialogReducer,
  login: loginReducer
});

export default rootSlice;
