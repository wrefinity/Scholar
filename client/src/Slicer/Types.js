import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";

const initialState = {
  types: [],
  status: "idle",
  message: "",
};
const API_URL = "types";
export const createTypes = createAsyncThunk(
  "types/create",
  async (credentials, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.getItem("user"))?.token;
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
export const getTypes = createAsyncThunk(
  "types/get_all",
  async (_, { rejectWithValue }) => {
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
      return rejectWithValue(message);
    }
  }
);

export const updateType = createAsyncThunk(
  "types/update",
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
export const deleteType = createAsyncThunk(
  "types/delete",
  async (credentials, thunkAPI) => {
    try {
      const token = requestHandler.getToken(thunkAPI);
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

const typeSlice = createSlice({
  name: "types",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "loading";
      state.message = "";
    },
  },
  extraReducers: {
    [createTypes.pending]: (state) => {
      state.status = "loading";
    },
    [createTypes.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.types.push(payload);
      state.message = "created the type of applicant class";
    },
    [createTypes.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getTypes.pending]: (state) => {
      state.status = "loading";
    },
    [getTypes.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.types = payload;
      state.status = "idle";
    },
    [getTypes.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    },
    //update case
    [updateType.pending]: (state) => {
      state.status = "loading";
    },
    [updateType.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload;
    },
    [updateType.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload.data;
      state.types = state.types.map((typ) => (typ._id === _id ? payload : typ));
    },
    //deletecase
    [deleteType.pending]: (state) => {
      state.status = "loading";
    },
    [deleteType.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [deleteType.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload;
      state.types = state.types.filter((typ) => typ._id !== _id);
      state.message = "deletion success";
    },
  },
});

export const selectAllTypes = (state) => state?.types?.types;
export const getTypeStatus = (state) => state?.types?.status;
export const getTypeMessage = (state) => state?.types?.message;
export const getTypeById = (state, id) =>
  state.types.types.find((typ) => typ._id === id);
export const { reseter } = typeSlice.actions;

export default typeSlice.reducer;
