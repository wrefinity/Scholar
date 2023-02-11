import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "scholarships";

const initialState = {
  scholarships: [],
  status: "idle",
  message: "",
};

export const createScholarship = createAsyncThunk(
  "scholarships/create",
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

export const getScholarship = createAsyncThunk(
  "scholarships/get_all",
  async (_, ThunkAPI) => {
    try {
      const token =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const res = await requestHandler.axioGetHeader(API_URL, token);
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

export const updateScholarShip = createAsyncThunk(
  "scholarships/update",
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
export const deleteScholarship = createAsyncThunk(
  "scholarships/delete",
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

const scholarshipSlice = createSlice({
  name: "scholarships",
  initialState,
  reducers: {
    reseter: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: {
    [createScholarShip.pending]: (state) => {
      state.status = "loading";
    },
    [createScholarShip.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.scholarships.push(payload.data);
    },
    [createScholarShip.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    [getScholarship.pending]: (state) => {
      state.status = "loading";
    },
    [getScholarship.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.scholarships = payload.data;
      state.status = "idle";
    },
    [getScholarship.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
      state.status = "idle";
    },
    //update case
    [updateScholarShip.pending]: (state) => {
      state.status = "loading";
    },
    [updateScholarShip.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [updateScholarShip.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.scholarships = state.scholarships.map((sch) =>
        payload._id === sch._id ? payload : sch
      );
    },
    //deletecase
    [deleteScholarship.pending]: (state) => {
      state.status = "loading";
    },
    [deleteScholarship.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload;
    },
    [deleteScholarship.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.scholarships = state.scholarships.filter(
        (sch) => sch._id !== payload?.data._id
      );
      state.message = "deletion successful";
    },
  },
});

const { reducer, actions } = scholarshipSlice;
export const selectAllScholarships = (state) => state.scholarships.scholarships;
export const getScholarshipStatus = (state) => state.scholarships.status;
export const getScholarshipsError = (state) => state.scholarships.message;
export const getScholarshipsById = (state, id) =>
  state.scholarships.scholarships.find((sch) => sch._id === id);

export const { reseter } = actions;
export default reducer;
