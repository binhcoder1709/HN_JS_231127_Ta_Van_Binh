import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../api/axios";

export const register = createAsyncThunk("users/register", async (data: object) => {
  try {
    baseUrl.post("auth/register", data);
  } catch (error) {
    console.error(error);
  }
});

export const login = createAsyncThunk("users/login", async (data: object) => {
  try {
    const response = await baseUrl.post("auth/login", data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
