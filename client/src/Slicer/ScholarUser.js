import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import requestHandler from "./requestHandler";
const API_URL = "scholarships";

const initialState = {
  scholarship: [],
  status: "idle",
  message: "",
};

export const createScholarship = createAsyncThunk(
  "scholarships/create",
  async (credentials, ThunkAPI) => {
    try {
      const data = { scholar: credentials };
      const token = requestHandler.getToken(ThunkAPI);
      const res = await requestHandler.axioPostHeader(
        `${API_URL}/apply`,
        data,
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
      const token = requestHandler.getToken(ThunkAPI);
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
      const token = requestHandler.getToken(ThunkAPI);
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
  async (credentials, ThunkAPI) => {
    try {
      const token = requestHandler.getToken(ThunkAPI);
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
      return ThunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteSingleScholarship = createAsyncThunk(
  "scholarships/delete",
  async (credentials, ThunkAPI) => {
    try {
      const userInfo =
        ThunkAPI.getState().auth.user.token ??
        JSON.parse(localStorage.getItem("user")).token;
      const { _id: userId } = userInfo;
      const postId = credentials;
      const res = requestHandler.axioDeleteHeader(
        `${API_URL}/${userId}/${postId}`,
        userInfo?.token
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
    [createScholarship.pending]: (state) => {
      state.status = "loading";
    },
    [createScholarship.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.scholarships.push(payload.data.scholar);
      state.message = payload.data.message;
    },
    [createScholarship.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    //getting all scholarships applied
    [getScholarship.pending]: (state) => {
      state.status = "loading";
    },
    [getScholarship.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      state.scholarships = payload.data.scholar;
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
      const scholes = payload.data.scholar;
      state.status = "succeeded";
      state.scholarships = state.scholarships.map((sch) =>
        scholes._id === sch._id ? scholes : sch
      );
    },
    //deletecase
    [deleteScholarship.pending]: (state) => {
      state.status = "loading";
    },
    [deleteScholarship.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    [deleteScholarship.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const scholes = payload.data.scholar;
      state.scholarships = state.scholarships.filter(
        (sch) => sch._id !== scholes._id
      );
      state.message = payload.data.message;
    },
    //deletecase single scholar
    [deleteSingleScholarship.pending]: (state) => {
      state.status = "loading";
    },
    [deleteSingleScholarship.rejected]: (state, { payload }) => {
      state.status = "failed";
      state.message = payload.data.message;
    },
    [deleteSingleScholarship.fulfilled]: (state, { payload }) => {
      state.status = "succeeded";
      const scholes = payload.data.scholar;
      state.scholarships = state.scholarships.filter(
        (sch) => sch._id !== scholes._id
      );
      state.message = payload.data.message;
    },
  },
});

const { reducer, actions } = scholarshipSlice;
export const selectAllScholarships = (state) =>
  state?.scholarships?.scholarships;
export const getScholarshipStatus = (state) => state?.scholarships?.status;
export const getScholarshipsError = (state) => state?.scholarships?.message;
export const getScholarshipsById = (state, id) =>
  state.scholarships.scholarships.find((sch) => sch._id === id);

export const { reseter } = actions;
export default reducer;
