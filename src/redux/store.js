import { configureStore } from "@reduxjs/toolkit";
import artSlice from "./artSlice";

export const store = configureStore({
  reducer: {
    art: artSlice,
  },
});
