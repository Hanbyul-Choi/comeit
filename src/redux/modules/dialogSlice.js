import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  content: ""
};

const dialogSlice = createSlice({
  name: "dialog",
  initialState,
  reducers: {
    selectMode: (state, action) => {
      return action.payload;
    }
    // openAlert: (state, action) => {
    //   state.isOpen = true
    //   state.content = action.payload
    // },
    // closeAlert: (state, action) => {
    //   state.isOpen = action.payload
    // }
  }
});

export default dialogSlice.reducer;
export const { selectMode } = dialogSlice.actions;
