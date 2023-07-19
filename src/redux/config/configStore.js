import { configureStore } from "@reduxjs/toolkit";
import dialog from "redux/modules/dialogSlice";

const store = configureStore({
  reducer: {
    dialog
  }
});

export default store;
