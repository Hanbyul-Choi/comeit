import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: 33.45168,
  lng: 126.574942
};

const centerSlice = createSlice({
  name: "center",
  initialState,
  reducers: {
    setCenter: (state, action) => action.payload
  }
});

export default centerSlice.reducer;
export const { setCenter } = centerSlice.actions;
