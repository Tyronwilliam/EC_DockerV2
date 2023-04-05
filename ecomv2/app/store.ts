import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/slice";
import loginModalReducer from "../features/common/slice";
import { api } from "../app/services/api";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    loginModal: loginModalReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

// export type AppDispatch = typeof store.dispatch;
export default store;
// // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch)
