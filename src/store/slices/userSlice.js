import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "api/services";

export const loginThunk = createAsyncThunk("user/login", async (data) => {
  const response = await $api.login(data);

  return response.data;
});

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state, action) => {
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.data = action.payload.user
      })
      .addCase(loginThunk.rejected, (state, action) => {
      });
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;