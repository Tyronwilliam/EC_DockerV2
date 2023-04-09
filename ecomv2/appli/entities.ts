import { persistReducer } from "redux-persist";
import authReducer from "@/features/auth/slice";
import utilityReducer from "../features/common/slice";
import { combineReducers } from "@reduxjs/toolkit";
import { storage } from "./storage";
import { api } from "./services/api";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: [api.reducerPath, "utilityModal"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  utilityModal: utilityReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
