import { configureStore } from "@reduxjs/toolkit";
import center from "redux/modules/centerSlice";
import user from "redux/modules/userSlice";

const store = configureStore({
  reducer: {
    user,
    center
  }
});

export default store;
