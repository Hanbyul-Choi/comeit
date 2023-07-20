import { configureStore } from "@reduxjs/toolkit";
import user from "redux/modules/userSlice";

const store = configureStore({
  reducer: {
    user
  }
});

export default store;
