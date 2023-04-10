import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
