import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const initialState = {
  about: [],
  status: "idle",
  message: "",
};
const API_URL = "about/";
export const createAbout = createAsyncThunk(
  "about/create",
  async (credentials, thunkAPI) => {
    try {
      const token =
        thunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = await requestHandler.axioPostHeader(
        API_URL,
        credentials,
        token
      );
      return res?.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message.toString() ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getAbout = createAsyncThunk("about/get", async (_, ThunkAPI) => {
  try {
    const res = await requestHandler.axioGet(API_URL);
    return res?.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message.toString() ||
      error.toString();
    return ThunkAPI.rejectWithValue(message);
  }
});

// update about
export const updateAbout = createAsyncThunk(
  "about/update",
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

const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: {
    [createAbout.pending]: (state, _) => {
      state.status = "loading";
    },
    [createAbout.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.about.push(payload);
      state.message = payload._id ? "about added" : "something went wrong";
    },
    [createAbout.rejected]: (state, { payload }) => {
      state.status = "rejected";
      state.message = payload.message;
    },
    [getAbout.pending]: (state) => {
      state.status = "loading";
    },
    [getAbout.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.about = payload;
      state.status = "idle";
    },
    [getAbout.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    },
    // updating gallery
    [updateAbout.pending]: (state) => {
      state.status = "loading";
    },
    [updateAbout.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.galleries.map((gal) => (payload._id === gal._id ? payload : gal));
    },
    [updateAbout.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
  },
});

const { reducer, actions } = aboutSlice;
export const selectAllAbout = (state) => state?.about?.about;
export const getAboutStatus = (state) => state?.about?.status;
export const getAboutError = (state) => state?.about?.message;
export const getAboutById = (state, id) =>
  state.about.about.find((abt) => abt?._id === id);
export const { reseter } = actions;
export default reducer;
