import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { configToastObj } from '../assets/data';
import { apiCallBegan } from './api';

const initialState = {
  list: [],
  loading: false,
};

const slice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    showsRequested: (shows, action) => {
      shows.loading = true;
    },
    showsReceived: (shows, action) => {
      shows.list = action.payload.data;
      shows.loading = false;
    },
    showsRequestFailed: (shows, action) => {
      shows.loading = false;
      toast.error(`Something went wrong...`, configToastObj);
    },
    showsAdded: (shows, action) => {
      shows.list.push(action.payload.data);
      toast.success('Yippe! Show Successfully Added.', configToastObj);
    },
    showsRemoved: (shows, action) => {
      shows.list = shows.list.filter((show) => {
        return show.id !== action.payload.deletedShowId;
      });
      toast.success('Yippe! Show Successfully Removed.', configToastObj);
    },
    showsUpdate: (shows, action) => {
      let indexToBeUpdated = shows.list.findIndex(
        (s) => s.id === action.payload.result.id
      );

      shows.list[indexToBeUpdated] = action.payload.result;
      toast.success('Yippe! Show Successfully Updated.', configToastObj);
    },
  },
});

export const {
  showsReceived,
  showsRemoved,
  showsRequestFailed,
  showsAdded,
  showsRequested,
  showsUpdate,
} = slice.actions;

export default slice.reducer;

//Fetch Action Creator
export const fetchShows = (param) => (dispatch, getState) => {
  const { url, headers } = param;
  dispatch(
    apiCallBegan({
      url,
      headers,
      onStart: showsRequested.type,
      onSuccess: showsReceived.type,
      onError: showsRequestFailed.type,
    })
  );
};

//Fetchn All Action Creator
export const fetchAllShows = (param) => (dispatch, getState) => {
  const { url, headers } = param;
  dispatch(
    apiCallBegan({
      url,
      headers,
      onStart: showsRequested.type,
      onSuccess: showsReceived.type,
      onError: showsRequestFailed.type,
    })
  );
};

//Create Action Creator
export const createShows = (param) => (dispatch, getState) => {
  const { url, headers, data } = param;
  dispatch(
    apiCallBegan({
      url,
      headers,
      method: 'POST',
      data,
      onSuccess: showsAdded.type,
      onError: showsRequestFailed.type,
    })
  );
};

//Delete Action Creator
export const deleteShows = (param) => (dispatch, getState) => {
  const { url, headers, data } = param;
  console.log(param);
  dispatch(
    apiCallBegan({
      url,
      headers,
      method: 'DELETE',
      data,
      onSuccess: showsRemoved.type,
      onError: showsRequestFailed.type,
    })
  );
};

//Update Action Creator
export const updateShows = (param) => (dispatch, getState) => {
  const { url, headers, data } = param;
  // console.log(param);
  dispatch(
    apiCallBegan({
      url,
      headers,
      method: 'PUT',
      data,
      onSuccess: showsUpdate.type,
      onError: showsRequestFailed.type,
    })
  );
};
