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
    initializeUser: () => initialState,
    updateProfileImg: (state, { payload: userImgUrl }) => ({
      ...state,
      user: { ...state.user, userImgUrl }
    }),
    updateNickname: (state, { payload: nickname }) => ({
      ...state,
      user: { ...state.user, nickname }
    })
  }
});

export default userSlice.reducer;
export const { getUser, initializeUser, updateProfileImg, updateNickname } = userSlice.actions;
