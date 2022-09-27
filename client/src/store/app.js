import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  createModalToggle: false,
  updateModalToggle: false,
  spinner: false,
  updateShow: {},
};

const slice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appCreateModalToggle: (app, action) => {
      app.createModalToggle = app.createModalToggle ? false : true;
    },
    appUpdateModalToggle: (app, action) => {
      app.updateModalToggle = app.updateModalToggle ? false : true;
    },
    appUpdateShow: (app, action) => {
      app.updateShow = action.payload;
    },
  },
});

export const { appCreateModalToggle, appUpdateModalToggle, appUpdateShow } =
  slice.actions;

export default slice.reducer;
