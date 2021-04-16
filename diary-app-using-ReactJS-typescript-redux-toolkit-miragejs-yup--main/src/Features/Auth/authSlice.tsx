import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initStateAuth } from "../../Interface/type";

const initialState: initStateAuth = {
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    saveToken(state, { payload }: PayloadAction<string>) {
      if (payload) {
        state.token = payload;
      }
    },
    clearToken(state) {
      state.token = null;
    },
    setAuthState(state, { payload }: PayloadAction<boolean>) {
      state.isAuthenticated = payload;
    },
  },
});

export const { saveToken, clearToken, setAuthState } = authSlice.actions;

export default authSlice.reducer;
