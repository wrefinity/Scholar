import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const initialState = {
  subcribe: [],
  status: "idle",
  message: "",
};
const API_URL = "subcribe/";
export const createSub = createAsyncThunk(
  "subcribe/create",
  async (credentials, thunkAPI) => {
    try {
      const res = await requestHandler.axioPost(
        API_URL,
        credentials
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

// sending notification
export const sendNotification = createAsyncThunk(
  "subcribe/notify",
  async (payload, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = await requestHandler.axioPostHeader(
        `${API_URL}/notify`,
        payload,
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
export const getSubcription = createAsyncThunk("subcribe/get", async (_, ThunkAPI) => {
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

// unsubcribe
export const unSubcribe = createAsyncThunk(
  "subcribe/delete",
  async (_id, thunkAPI) => {
    const token =
      thunkAPI.getState().auth.user.token ??
      JSON.parse(localStorage.getItem("user")).token;
    try {
      const res = await requestHandler.axioDeleteHeader(
        `${API_URL}/${_id}`,
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

const subcribeSlice = createSlice({
  name: "subcribe",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "";
      state.message = "";
    },
  },
  extraReducers: {
    [sendNotification.pending]: (state, _) => {
      state.status = "loading";
    },
    [sendNotification.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload.message
    },
    [sendNotification.rejected]: (state, { payload }) => {
      state.status = "failled";
      state.message = payload.message;
    },
    [createSub.pending]: (state, _) => {
      state.status = "loading";
    },
    [createSub.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.message = payload._id ? "subcription success" : "something went wrong";
    },
    [createSub.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getSubcription.pending]: (state) => {
      state.status = "loading";
    },
    [getSubcription.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.subcribe = payload;
      state.status = "idle";
    },
    [getSubcription.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    },
    //deletecase
    [unSubcribe.pending]: (state) => {
      state.status = "loading";
    },
    [unSubcribe.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [unSubcribe.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload;
      state.subcribe = state.subcribe.filter((sub) => sub._id !== _id);
      state.message = "deletion sucessful";
    },
  },
});

const { reducer, actions } = subcribeSlice;
export const selectAllSub = (state) => state?.subcribe?.subcribe;
export const getSubcribetatus = (state) => state?.subcribe?.status;
export const getSubcribeError = (state) => state?.subcribe?.message;
export const getSubcribeById = (state, id) =>
  state.subcribe.subcribe.find((sub) => sub?._id === id);
export const { reseter } = actions;
export default reducer;
