import { createSlice } from "@reduxjs/toolkit";
import { ShowType } from "./model";
import { RootState } from "@/app/store";

const initialState: ShowType = {
  show: false,
};

const loginModalSlice = createSlice({
  name: "loginModal",
  initialState,
  reducers: {
    open: (state) => {
      state.show = true;
    },
    close: (state) => {
      state.show = false;
    },
  },
});

export const { open, close } = loginModalSlice.actions;

export const selectShow = (state: RootState) => state.loginModal.show;
export default loginModalSlice.reducer;
