import { configureStore } from "@reduxjs/toolkit";
import { api } from "../app/services/api";
import persistedReducer from "./entities";
import {
  persistStore,
  REGISTER,
  REHYDRATE,
  PERSIST,
} from "redux-persist";
import thunk from "redux-thunk";

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [REGISTER, REHYDRATE, PERSIST],
      },
    }).concat(api.middleware),
  // extraReducers: (builder) => {
  //   builder.addCase(PURGE, (state) => {
  //     customEntityAdapter.removeAll(state);
  //   });
  // },
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };

// // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
