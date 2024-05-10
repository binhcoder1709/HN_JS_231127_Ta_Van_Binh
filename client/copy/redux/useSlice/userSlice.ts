import { createSlice } from "@reduxjs/toolkit";
import { findAll } from "../../services/user.service";

interface UseState {
  data: any[];
  status: string;
  error: string;
}

const initialState: UseState = {
  data: [],
  status: "idle",
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(findAll.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(findAll.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(findAll.rejected, (state, action) => {
        state.status = "Failed!";
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;