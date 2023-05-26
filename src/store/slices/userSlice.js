import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { $api } from "api/services";

export const loginThunk = createAsyncThunk("user/login", async (data) => {
  const response = await $api.login(data);
  return response.data;
});

export const registerThunk = createAsyncThunk("user/register", async (data) => {
  const response = await $api.register(data);
  return response.data;
});

const initialState = {
  user: null,
  errorMessage: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
    logout: () => {
      localStorage.removeItem('token')

      return initialState
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state, action) => {
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = {
          ...action.payload,
          ...Object.values(action.payload.user)[0]
        }

        localStorage.setItem('token', action.payload.access_token)
      })
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = {
          ...action.payload,
          ...Object.values(action.payload.user)[0]
        }

        localStorage.setItem('token', action.payload.access_token)
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.errorMessage = 'Неверный email или пароль'
      });
  },
});

export const { reducer: userReducer, actions: userActions } = userSlice;