import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "services";

const initialState = {
  services: [],
  status: "idle",
  message: "",
};

export const createService = createAsyncThunk(
  "services/create",
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

export const getServices = createAsyncThunk(
  "services/get_all",
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

export const updateServices = createAsyncThunk(
  "services/update",
  async (credentials, ThunkAPI) => {
    try {
      const { _id, ...rest } = credentials;
      const token =
        ThunkAPI.getState().auth.user.token ??
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
export const deleteServices = createAsyncThunk(
  "services/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = await requestHandler.axioDeleteHeader(
        `${API_URL}/${credentials}`,
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

const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: {
    [createService.pending]: (state) => {
      state.status = "loading";
    },
    [createService.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.services.push(payload);
    },

    [createService.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getServices.pending]: (state) => {
      state.status = "loading";
    },
    [getServices.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.services = payload;
      state.status = "idle";
    },
    [getServices.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    },
    //update case
    [updateServices.pending]: (state) => {
      state.status = "loading";
    },
    [updateServices.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload;
    },
    [updateServices.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.services = state.services.map((s) =>
        payload._id === s._id ? payload : s
      );
      state.message = "update operation successful";
    },
    //deletecase
    [deleteServices.pending]: (state) => {
      state.status = "loading";
    },
    [deleteServices.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [deleteServices.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload;
      state.services = state.services.filter((s) => s._id !== _id);
      state.message = "deleted successfully";
    },
  },
});

const { reducer, actions } = serviceSlice;
export const selectAllServices = (state) => state?.services?.services;
export const getServiceStatus = (state) => state?.services?.status;
export const getServiceError = (state) => state?.services?.message;
export const getServiceById = (state, id) =>
  state.services.services.find((ser) => ser._id === id);

export const { reseter } = actions;
export default reducer;
