import { createSlice } from "@reduxjs/toolkit";
import { login, register } from "../../services/auth.service";


const initialState = {
  data: "",
  status: "idle",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(register.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "Successfully!";
      })
      .addCase(register.rejected, (state) => {
        state.status = "Failed!";
      })
      // đăng nhập
      .addCase(login.pending, (state) => {
        state.status = "Pending!";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "Successfully!";
        state.data = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.status = "Failed!";
      });
  },
});

export default authSlice.reducer;
