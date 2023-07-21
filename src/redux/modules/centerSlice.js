import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  center: {
    lat: 33.45168,
    lng: 126.574942
  },
  position: null,
  place: null
};

const centerSlice = createSlice({
  name: "center",
  initialState,
  reducers: {
    initialize: () => initialState,
    setCenter: (state, { payload }) => ({ ...state, center: payload }),
    setPostion: (state, { payload }) => ({ ...state, position: payload }),
    setPlace: (state, { payload }) => ({ ...state, place: payload })
  }
});

export default centerSlice.reducer;
export const { setCenter, setPlace, setPostion, initialize } = centerSlice.actions;
