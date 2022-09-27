import { combineReducers } from '@reduxjs/toolkit';

import showReducer from './show';
import appReducer from './app';
export default combineReducers({
  show: showReducer,
  app: appReducer,
});
