import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "partners";

const initialState = {
  partners: [],
  sstatus: "idle",
  message: "",
};

export const createPartners = createAsyncThunk(
  "partners/create",
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

export const getPartners = createAsyncThunk(
  "partners/get_all",
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

export const updatePartners = createAsyncThunk(
  "partners/update",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = requestHandler.axioPatchHeader(
        `${API_URL}/${credentials._id}`,
        credentials,
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
export const deletePartners = createAsyncThunk(
  "partners/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = requestHandler.axioDeleteHeader(
        `${API_URL}/${credentials}`,
        token
      );
      return res?.data;
    } catch (error) {
      const message = error.response || error.toSting();
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const partnersSlice = createSlice({
  name: "partners",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: {
    [createPartners.pending]: (state) => {
      state.status = "loading";
    },
    [createPartners.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.partners.push(payload);
      state.message = "partner created";
    },
    [createPartners.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getPartners.pending]: (state) => {
      state.status = "loading";
    },
    [getPartners.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.partners = payload;
      state.status = "idle";
    },
    [getPartners.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.message;
    },
    // deletecase
    [deletePartners.pending]: (state) => {
      state.status = "loading";
    },
    [deletePartners.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload.message;
    },
    [deletePartners.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.partners = state.partners.filter((s) => s._id !== payload?._id);
      state.message = "partner deleted";
    },
  },
});

const { reducer, actions } = partnersSlice;
export const selectAllPatners = (state) => state.partners?.partners;
export const getPatnerStatus = (state) => state?.partners?.status;
export const getPatnerError = (state) => state?.partners?.message;
export const getPatnerById = (state, id) =>
  state.partners.partners.find((pat) => pat._id === id);

export const { reseter } = actions;
export default reducer;
