import { configureStore } from "@reduxjs/toolkit";
import { candidateApi } from "./api/candidate";
import { documentApi } from "./api/document";

// import authSlice from "./authSlice";
import { employeeApi } from "./api/employee";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { leadApi } from "./api/lead";
import { loginApi } from "./api/login";
import { timetableApi } from "./api/timetable";
import authSlice from "./authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    [candidateApi.reducerPath]: candidateApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [leadApi.reducerPath]: leadApi.reducer,
    [employeeApi.reducerPath]: employeeApi.reducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [timetableApi.reducerPath]: timetableApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(candidateApi.middleware)
      .concat(documentApi.middleware)
      .concat(leadApi.middleware)
      .concat(employeeApi.middleware)
      .concat(loginApi.middleware)
      .concat(timetableApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
