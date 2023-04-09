import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoggedUserType } from "./models";
import { RootState } from "@/appli/store";
import { destroyCookie, setCookie } from "nookies";
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
      setCookie(null, "accessTokenEcon", action.payload, {
        path: "/",
        expires,
      });
      state.token = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      destroyCookie(null, "accessTokenEcon");
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload || null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout, setError, setLoading } =
  authSlice.actions;
export const selectIsLogged = (state: RootState) => Boolean(state.auth.token);
export const selectUser = (state: RootState) => state.auth.user;
export const selectError = (state: RootState) => state.auth.error;

export default authSlice.reducer;

const threeDaysInSeconds = 3 * 24 * 60 * 60; // 3 days in seconds
const expires = new Date(Date.now() + threeDaysInSeconds * 1000);
