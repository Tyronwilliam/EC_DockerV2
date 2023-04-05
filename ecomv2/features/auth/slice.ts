import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { LoggedUserType, TokenType } from "./models";

interface AuthState {
  error: string | null;
  user: LoggedUserType | null;
  token: string;
  loading: boolean;
}

const initialState: AuthState = {
  error: null,
  user: null,
  token: "",
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
      console.log(action.payload, "TOKEN TYPE");
      console.log(action.payload, "TOKEN TYPE only action");
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
