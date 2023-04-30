import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const initialState = {
  comments: [],
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  message: "", 
};
const API_URL = "comments";
export const createComment = createAsyncThunk(
  "comments/create",
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
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const getComment = createAsyncThunk(
  "comments/get_all",
  async (_, thunkAPI) => {
    try {
      const res = await requestHandler.axioGet(API_URL);
      return res?.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/update",
  async (credentials, thunkAPI) => {
    try {
      const token =
        thunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
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
export const deleteComment = createAsyncThunk(
  "comments/delete",
  async (credentials, thunkAPI) => {
    try {
      const token =
        thunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = await requestHandler.axioDeleteHeader(
        `${API_URL}/${credentials}`,
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

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "loading";
      state.message = "";
    },
  },
  extraReducers: {
    [createComment.pending]: (state) => {
      state.status = "loading";
    },
    [createComment.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.comments.push(payload);
    },
    [createComment.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getComment.pending]: (state) => {
      state.status = "loading";
    },
    [getComment.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.comments = payload;
      state.status = "idle";
    },
    [getComment.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    },
    //update case
    [updateComment.pending]: (state) => {
      state.status = "loading";
    },
    [updateComment.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload;
    },
    [updateComment.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload;
      state.comments = state.comments.map((com) =>
        com._id === _id ? payload : com
      );
      // state.comments.map((s) => (payload._id === s._id ? payload : s));
    },
    //deletecase
    [deleteComment.pending]: (state) => {
      state.status = "loading";
    },
    [deleteComment.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [deleteComment.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload;
      state.comments = state.comments.filter((com) => com._id !== _id);
    },
  },
});

export const selectAllComments = (state) => state?.comments?.comments;
export const getCommentStatus = (state) => state?.comments?.status;
export const getCommentError = (state) => state?.comments?.message;
export const getCommentById = (state, id) =>
  state.comments.comments.find((com) => com._id === id);
export const { reseter } = commentSlice.actions;

export default commentSlice.reducer;
