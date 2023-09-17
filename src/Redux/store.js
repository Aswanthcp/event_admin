import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  admin: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.admin = null;
      state.token = null;
    },
    setAdmin: (state, action) => {
      state.admin = action.payload.admin;
    },
  },
});

export const {
  setMode,
  setLogin,
  setLogout,
  setAdmin,

} = authSlice.actions;
export default authSlice.reducer;
