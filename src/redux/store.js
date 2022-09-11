import { configureStore } from "@reduxjs/toolkit";
import imgBReducer from './signatureImgBSlice';

export const store = configureStore({
  reducer: {
    signatureImg: imgBReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false
    })
});