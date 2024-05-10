import { createSlice } from "@reduxjs/toolkit";
import { findAll } from "../../services/user.service";

const initialState = {
  data: [],
  status: "idle",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(findAll.pending, (state) => {
        state.status = "pending";
      })
      .addCase(findAll.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(findAll.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "An error occurred.";
      });
  },
});

export const selectData = (state) => state.user.data;

export default userSlice.reducer;
