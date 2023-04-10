import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/Shared/userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
