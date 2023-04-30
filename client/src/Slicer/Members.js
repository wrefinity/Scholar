import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "members";

const initialState = {
  members: [],
  status: "idle",
  message: "",
};

export const createMembers = createAsyncThunk(
  "members/create",
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
        (error.response && error.data && error.data.message) ||
        error.message.toString() ||
        error.toString();

      return ThunkAPI.rejectWithValue(message);
    }
  }
);

export const getMembers = createAsyncThunk(
  "members/get_all",
  async (_, ThunkAPI) => {
    try {
      const res = await requestHandler.axioGet(API_URL);
      return res?.data;
    } catch (error) {
      const message =
        (error.response && error.data && error.data.message) ||
        error.message.toString() ||
        error.toString();
      ThunkAPI.rejectWithValue(message);
    }
  }
);

export const updateMembers = createAsyncThunk(
  "members/update",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const { _id, ...rest } = credentials;
      const res = await requestHandler.axioPatchHeader(
        `${API_URL}/${_id}`,
        rest,
        token
      );
      return res?.data;
    } catch (error) {
      const message =
        (error.response && error.data && error.data.message) ||
        error.message.toString() ||
        error.toSting();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteMembers = createAsyncThunk(
  "members/delete",
  async (credentials, thunkAPI) => {
    try {
      const token =
        thunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = requestHandler.axioDeleteHeader(
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

const membersSlice = createSlice({
  name: "members",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: {
    [createMembers.pending]: (state) => {
      state.status = "loading";
    },
    [createMembers.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.members.push(payload);
    },
    [createMembers.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    [getMembers.pending]: (state) => {
      state.status = "loading";
    },
    [getMembers.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.members = payload;
      state.status = "idle";
    },
    [getMembers.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    },
    //update case
    [updateMembers.pending]: (state) => {
      state.status = "loading";
    },
    [updateMembers.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [updateMembers.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.members = state.members.map((mem) =>
        payload._id === mem._id ? payload : mem
      );
    },
    //deletecase
    [deleteMembers.pending]: (state) => {
      state.status = "loading";
    },
    [deleteMembers.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [deleteMembers.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.members = state.members.filter((mem) => mem._id !== payload?._id);
      state.message = "deletion successful";
    },
  },
});

const { reducer, actions } = membersSlice;
export const selectAllMembers = (state) => state?.members?.members;
export const getMemberStatus = (state) => state?.members?.status;
export const getMemberError = (state) => state?.members?.message;
export const getMemberById = (state, id) =>
  state.members.members.find((mem) => mem._id === id);

export const { reseter } = actions;
export default reducer;
