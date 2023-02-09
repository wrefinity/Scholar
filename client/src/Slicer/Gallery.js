import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "galleries";

const initialState = {
  galleries: [],
  status: "idle",
  message: "",
};

// Create new Gallery
export const createGallery = createAsyncThunk(
  "galleries/create",
  async (credentials, thunkAPI) => {
    try {
      const token =
        thunkAPI.getState().auth.user?.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = await requestHandler.axioPostHeader(
        API_URL,
        credentials,
        token
      );
      return res?.data;
    } catch (er) {
      const message =
        (er.response && er.response.data && er.response.data.message) ||
        er.message ||
        er.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get galleries
export const getGalleries = createAsyncThunk(
  "galleries/get_all",
  async (_, thunkAPI) => {
    try {
      const res = await requestHandler.axioGet(API_URL);
      return res?.data;
    } catch (er) {
      const message =
        (er.response && er.response.data && er.response.data.message) ||
        er.message ||
        er.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// update galleries
export const updateGalleries = createAsyncThunk(
  "galleries/update",
  async (credentials, thunkAPI) => {
    const token =
      thunkAPI.getState().auth.user.token ??
      JSON.parse(localStorage.getItem("user")).token;
    try {
      const { _id, ...rest } = credentials;
      const res = await requestHandler.axioPatchHeader(
        `${API_URL}/${_id}`,
        rest,
        token
      );
      return res?.data;
    } catch (er) {
      const message =
        (er.response && er.response.data && er.response.data.message) ||
        er.message ||
        er.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete gallary
export const deleteGalleries = createAsyncThunk(
  "galleries/delete",
  async (id, thunkAPI) => {
    try {
      const token =
        thunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = await requestHandler.axioDeleteHeader(
        `${API_URL}/${id}`,
        token
      );
      return res?.data;
    } catch (er) {
      const message =
        (er.response && er.response.data && er.response.data.message) ||
        er.message ||
        er.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const gallerySlice = createSlice({
  name: "galleries",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: {
    [createGallery.pending]: (state) => {
      state.status = "loading";
    },
    [createGallery.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.galleries.push(payload.data);
    },
    [createGallery.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getGalleries.pending]: (state) => {
      state.status = "loading";
    },
    [getGalleries.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.galleries = payload;
      state.status = "idle";
    },
    [getGalleries.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    },
    // updating gallery
    [updateGalleries.pending]: (state) => {
      state.status = "loading";
    },
    [updateGalleries.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.galleries.map((gal) => (payload._id === gal._id ? payload : gal));
    },
    [updateGalleries.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    // delleting gallery
    [deleteGalleries.pending]: (state) => {
      state.status = "loading";
    },
    [deleteGalleries.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.galleries = state.galleries.filter(
        (gal) => gal._id !== payload._id
      );
    },
    [deleteGalleries.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
  },
});

const { actions, reducer } = gallerySlice;
export const selectAllGalleries = (state) => state.galleries.galleries;
export const getGalleryStatus = (state) => state.galleries.status;
export const getGalleryError = (state) => state.galleries.message;
export const getGalleryById = (state, id) =>
  state.galleries.galleries.find((gal) => gal._id === id);
export const { reseter } = actions;

export default reducer;
