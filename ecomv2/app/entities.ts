import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "@/features/auth/slice";
import loginModalReducer from "../features/common/slice";
import { combineReducers } from "@reduxjs/toolkit";

import { api } from "../app/services/api";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  blacklist: [api.reducerPath, "loginModal"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  loginModal: loginModalReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
