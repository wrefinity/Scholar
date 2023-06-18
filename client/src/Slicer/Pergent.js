import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "pergants";

const initialState = {
  pergants: [],
  status: "idle",
  message: "",
};

export const createPergant = createAsyncThunk(
  "pergants/create",
  async (credentials, ThunkAPI) => {
    try {
      const token = requestHandler.getToken(ThunkAPI);
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

export const getPergant = createAsyncThunk(
  "pergants/get_all",
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

export const deletePergants = createAsyncThunk(
  "pergants/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = requestHandler.getToken(ThunkAPI);
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

export const updatePergant = createAsyncThunk(
  "pergants/update",
  async (credentials, thunkAPI) => {
    try {
      const token = requestHandler.getToken(thunkAPI);
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

// function increment model votes
export const incrementPergant = createAsyncThunk(
  "pergants/increment",
  async (credentials, thunkAPI) => {
    try {
      const { _id, ...rest } = credentials;
      console.warn(credentials)
      const res = await requestHandler.axioPatch(
        `${API_URL}/increment/${_id}`,
        rest
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

const pergantsSlice = createSlice({
  name: "pergants",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: {
    [createPergant.pending]: (state) => {
      state.status = "loading";
    },
    [createPergant.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.pergants.push(payload);
      state.message = "pergant created successfully";
    },
    [createPergant.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.message;
    },
    //update pergat model
    [incrementPergant.pending]: (state) => {
      state.status = "loading";
    },
    [incrementPergant.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload;
      state.pergants = state.pergants.map((per) =>
        per._id === _id ? payload : per
      );
      state.message = "pergant score increased";
    },
    [incrementPergant.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    // get pergents
    [getPergant.pending]: (state) => {
      state.status = "loading";
    },
    [getPergant.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.pergants = payload;
      state.status = "idle";
    },
    [getPergant.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
      state.status = "idle";
    },
    //deletecase
    [deletePergants.pending]: (state) => {
      state.status = "loading";
    },
    [deletePergants.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload.message;
    },
    [deletePergants.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.pergants = state.pergants.filter((s) => s._id !== payload._id);
    },
    //update case
    [updatePergant.pending]: (state) => {
      state.status = "loading";
    },
    [updatePergant.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload;
    },
    [updatePergant.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload;
      state.pergants = state.pergants.map((per) =>
        per._id === _id ? payload : per
      );
    },
  },
});

const { reducer, actions } = pergantsSlice;
export const sellectAllPergants = (state) => state?.pergants?.pergants;
export const getPergantsStatus = (state) => state?.pergants?.status;
export const getPergantsError = (state) => state?.pergants?.message;
export const getPergantsById = (state, id) =>
  state.pergants?.pergants?.find((per) => per?._id === id);

export const { reseter } = actions;
export default reducer;
