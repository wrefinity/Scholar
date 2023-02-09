import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "posts";

const initialState = {
  posts: [],
  status: "idle",
  message: "",
};

export const createScholarsPost = createAsyncThunk(
  "scholarpost/create",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
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
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const getScholarsPost = createAsyncThunk(
  "scholarpost/get_all",
  async (_, ThunkAPI) => {
    try {
      const res = await requestHandler.axioGet(API_URL);
      return res?.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message.toString() ||
        error.toString();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const updateScholarPost = createAsyncThunk(
  "scholarpost/update",
  async (credentials, ThunkAPI) => {
    try {
      const { _id, ...rest } = credentials;
      const token = ThunkAPI.getState().auth.user.token ??
      JSON.parse(localStorage.getItem("user")).token;
      const res = await requestHandler.axioPatchHeader(
        `${API_URL}/${_id}`,
        rest,
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
      return ThunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteScholarPost = createAsyncThunk(
  "scholarpost/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = ThunkAPI.getState().auth.user.token ??
      JSON.parse(localStorage.getItem("user")).token;
      const res = await requestHandler.axioDeleteHeader(
        `${API_URL}/${credentials._id}`,
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
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: {
    [createScholarsPost.pending]: (state) => {
      state.status = "loading";
    },
    [createScholarsPost.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.posts.push(payload);
    },
    [createScholarsPost.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getScholarsPost.pending]: (state) => {
      state.status = "loading";
    },
    [getScholarsPost.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.posts = payload;
      state.status = "idle";
    },
    [getScholarsPost.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    },
    //update case
    [updateScholarPost.pending]: (state) => {
      state.status = "loading";
    },
    [updateScholarPost.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload;
    },
    [updateScholarPost.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.post = state.posts.map((p) =>
        payload._id === p._id ? payload : p
      );
    },
    //deletecase
    [deleteScholarPost.pending]: (state) => {
      state.status = "loading";
    },
    [deleteScholarPost.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [deleteScholarPost.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.posts = state.posts.filter((p) => p._id !== payload._id);
    },
  },
});

const { reducer, actions } = postsSlice;
export const selectAllPost = (state) => state.posts.posts;
export const getPostStatus = (state) => state.posts.status;
export const getPostError = (state) => state.posts.message;
export const getPostById = (state, id) =>
  state.posts.posts.find((pst) => pst._id === id);

export const { reseter } = actions;
export default reducer;
