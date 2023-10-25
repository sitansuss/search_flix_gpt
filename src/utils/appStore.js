import { configureStore } from "@reduxjs/toolkit";
import userReucer from "./userSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice"

const appStore = configureStore({
  reducer: {
    user: userReucer,
    movie: movieReducer,
    gpt: gptReducer,
    config:configReducer,
  },
});

export default appStore;
