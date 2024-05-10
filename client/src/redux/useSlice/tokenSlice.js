import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie'

const token = Cookies.get("token");

const tokenSlice = createSlice({
  name: "token",
  initialState: {
    token: token || null,
    isAuthenticated: false,
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setToken, clearToken } = tokenSlice.actions;
export const selectToken = (state) => state.token.token;
export const selectAuthenticated = (state) => state.token.isAuthenticated;

export default tokenSlice.reducer;