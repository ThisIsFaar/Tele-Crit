import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import api from './middleware/api';
import {func} from './middleware/func';

import reducer from './reducer';

export default function () {
  return configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), func, api],
  });
}
