import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";

const initialState = {
  categories: [],
  status: "idle",
  message: "",
};
const API_URL = "categories";
export const createCategory = createAsyncThunk(
  "categories/create",
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
export const getCategories = createAsyncThunk(
  "categories/get_all",
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

export const updateCategories = createAsyncThunk(
  "categories/update",
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
const deleteCategories = createAsyncThunk(
  "categories/delete",
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

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "loading";
      state.message = "";
    },
  },
  extraReducers: {
    [createCategory.pending]: (state) => {
      state.status = "loading";
    },
    [createCategory.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.categories.push(payload.data);
    },
    [createCategory.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [getCategories.pending]: (state) => {
      state.status = "loading";
    },
    [getCategories.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.categories = payload.data;
      state.status = "idle";
    },
    [getCategories.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
      state.status = "idle";
    },
    //update case
    [updateCategories.pending]: (state) => {
      state.status = "loading";
    },
    [updateCategories.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.mesage = payload;
    },
    [updateCategories.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload.data;
      state.categories = state.categories.map((cat) =>
        cat._id === _id ? payload : cat
      );
    },
    //deletecase
    [deleteCategories.pending]: (state) => {
      state.status = "loading";
    },
    [deleteCategories.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [deleteCategories.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload.data;
      state.categories = state.categories.filter((cat) => cat._id !== _id);
    },
  },
});

export const selectAllCategories = (state) => state.categories.categories;
export const getCategoriesStatus = (state) => state.categories.status;
export const getCategoriesMessage = (state) => state.categories.message;
export const getCategoriesById = (state, id) =>
  state.categories.categories.find((cat) => cat._id === id);
export const { reseter } = categorySlice.actions;

export default categorySlice.reducer;
