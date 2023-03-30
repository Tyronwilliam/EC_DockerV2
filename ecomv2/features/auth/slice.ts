import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoggedUserType, TokenType } from "./models";

interface AuthState {
  error: string;
  user: LoggedUserType | null;
  token: TokenType | null;
}

const initialState: AuthState = {
  error: "",
  user: null,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<LoggedUserType>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<TokenType>) => {
      localStorage.setItem("accessToken", action.payload.access);
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      window.location.href = "/";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, setToken, logout } = authSlice.actions;

export default authSlice.reducer;
