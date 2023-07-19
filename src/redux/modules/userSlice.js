import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => ({
      ...state,
      user: action.payload
    }),
    initializeUser: () => initialState
  }
});

export default userSlice.reducer;
export const { getUser, initializeUser } = userSlice.actions;
