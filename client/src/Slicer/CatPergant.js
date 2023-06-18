import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";

const API_URL = "catpergants";

const initialState = {
  catpergants: [],
  status: "idle",
  message: "",
};

export const createCatPergant = createAsyncThunk(
  "catpergants/create",
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

export const getCatPergant = createAsyncThunk(
  "catpergants/get_all",
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
export const deleteCatPergant = createAsyncThunk(
  "catpergants/delete",
  async (credentials, ThunkAPI) => {
    try {
      const token = requestHandler.getToken(ThunkAPI);
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
      return ThunkAPI.rejectWithValue(message);
    }
  }
);

const catPergantSlice = createSlice({
  name: "catpergants",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: {
    [createCatPergant.pending]: (state) => {
      state.status = "loading";
    },
    [createCatPergant.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.catpergants.push(payload);
      state.message = "Record added";
    },
    [createCatPergant.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    [getCatPergant.pending]: (state) => {
      state.status = "loading";
    },
    [getCatPergant.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.catpergants = payload;
      state.status = "idle";
    },
    [getCatPergant.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
      state.status = "idle";
    },
    //deletecase
    [deleteCatPergant.pending]: (state) => {
      state.status = "loading";
    },
    [deleteCatPergant.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [deleteCatPergant.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const { _id } = payload;
      state.catpergants = state.catpergants.filter((cat) => cat._id !== _id);
      state.message = "Deletion Successful";
    },
  },
});

const { reducer, actions } = catPergantSlice;
export const sellectAllCatPergants = (state) => state?.catpergants?.catpergants;
export const getCatPergantStatus = (state) => state?.catpergants?.status;
export const getCatPergantError = (state) => state?.catpergants?.message;
export const getCatPergantById = (state, id) =>
  state.catpergants.catpergants.find((pay) => pay?._id === id);

export const { reseter } = actions;
export default reducer;
