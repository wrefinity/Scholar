import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "payments";

const initialState = {
  payments: [],
  status: "idle",
  message: "",
};

export const createPayments = createAsyncThunk(
  "payments/create",
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

export const getPayment = createAsyncThunk(
  "payments/get_all",
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

const paymentSlice = createSlice({
  name: "payments",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: {
    [createPayments.pending]: (state) => {
      state.status = "loading";
    },
    [createPayments.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.payments.push(payload.data);
    },
    [createPayments.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    [getPayment.pending]: (state) => {
      state.status = "loading";
    },
    [getPayment.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.payments = payload.data;
      state.status = "idle";
    },
    [getPayment.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
      state.status = "idle";
    },
  },
});

const { reducer, actions } = paymentSlice;
export const sellectAllPayments = (state) => state?.payments?.payments;
export const getPaymentStatus = (state) => state?.payments?.status;
export const getPaymentError = (state) => state?.payments?.message;
export const getPaymentById = (state, id) =>
  state.payments.payments.find((pay) => pay?._id === id);

export const { reseter } = actions;
export default reducer;
