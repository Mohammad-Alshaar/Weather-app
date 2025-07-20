import { configureStore } from "@reduxjs/toolkit";
import weatherApiReducer from "../features/weatherApi/weatherApiSlice";
export default configureStore({
  reducer: {
    weatherApi: weatherApiReducer,
  },
});
