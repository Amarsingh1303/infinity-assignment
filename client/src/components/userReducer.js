import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: {},
};

export const userSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.user.userDetails;

export default userSlice.reducer;
