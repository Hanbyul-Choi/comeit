import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  center: {
    lat: 37.56679717075284,
    lng: 126.97864094748478
  },
  position: null,
  place: ""
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
