import { createAsyncThunk } from "@reduxjs/toolkit";
import baseUrl from "../api/axios";

// tạo api với user
export const findAll = createAsyncThunk("users/findAll", async () => {
  try {
    const response = await baseUrl.get("users");    
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
