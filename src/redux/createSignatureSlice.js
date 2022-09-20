import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isUploading: false,
    isCreate: false,
    isDone: false,
}

export const createSignatureSlice = createSlice({
    name: 'createSignature',
    initialState,
    reducers: {
        createSignature: (state) => {
            state.isCreate = true;
        },
        completeSignature:(state) => {
            state.isCreate = false;
        },
        uploadSignatureImage: (state) => {
            state.isUploading = false;
        },
        completeUploadSignatureImage: (state) => {
            state.isDone = true;
        },
        resetState: (state) => {
            state.isCreate = false;
            state.isDone = false;
            state.isUploading = false;
        }
    }
})


export const { createSignature, completeSignature, uploadSignatureImage, completeUploadSignatureImage, resetState } =
  createSignatureSlice.actions;

export default createSignatureSlice.reducer;