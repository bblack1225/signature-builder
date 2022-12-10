import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
}

export const createSignatureSlice = createSlice({
    name: 'createSignature',
    initialState,
    reducers: {
        createSignature: (state) => {
            state.isLoading = true;
        },
        completeUploadSignatureImage: (state) => {
            state.isLoading = false;
        },
    }
})


export const { createSignature, completeUploadSignatureImage, resetState } =
  createSignatureSlice.actions;

export default createSignatureSlice.reducer;