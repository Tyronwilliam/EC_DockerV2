import {  createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoggedUserType } from "./models";
import { RootState } from "@/app/store";
interface AuthState {
  error: string | null;
  user: LoggedUserType | null;
  token: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  error: null,
  user: null,
  token: null,
  loading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoggedUserType>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem("accessToken", action.payload);
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout } = authSlice.actions;
export const selectIsLogged = (state: RootState) => Boolean(state.auth.token);

export default authSlice.reducer;
