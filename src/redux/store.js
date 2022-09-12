import { configureStore } from "@reduxjs/toolkit";
import imgReducer from './signatureImgSlice';
import createSignatureReducer from './createSignatureSlice';
import signatureTypeReducer from './signatureTypeSlice';

export const store = configureStore({
  reducer: {
    signatureImg: imgReducer,
    createSignature: createSignatureReducer,
    signatureType: signatureTypeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});