import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/appli/store";

export interface Utility {
  show?: boolean;
  message?: string;
  timeout?: number;
  open?: boolean;
  type?: string;
}
const initialState: Utility = {
  show: false,
  message: "",
  timeout: 3000,
  open: false,
  type: "",
};

const utilitySlice = createSlice({
  name: "utilityModal",
  initialState,
  reducers: {
    open: (state) => {
      state.show = true;
    },
    close: (state) => {
      state.show = false;
    },
    addNotification: (state, action: PayloadAction<Utility>) => ({
      ...initialState,
      ...action.payload,
      open: true,
      show: state.show,
    }),
    clearNotification: (state) => ({ ...state, open: false, show: state.show }),
  },
});

export const { open, close, addNotification, clearNotification } =
  utilitySlice.actions;

export const selectShow = (state: RootState) => state.utilityModal.show;
export const selectNotification = (state: RootState) => state.utilityModal;
export default utilitySlice.reducer;
