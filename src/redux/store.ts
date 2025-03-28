import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import coin from "./slices/coinslice/slice";

const store = configureStore({
  reducer: { coin },
});

type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
