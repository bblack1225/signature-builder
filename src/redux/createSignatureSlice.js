import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isUploading: false,
    isCreate: false,
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
            state.isUploading = true;
        },
        completeUploadSignatureImage: (state) => {
            state.isUploading = false;
        }
    }
})


export const { createSignature, completeSignature, uploadSignatureImage, completeUploadSignatureImage } =
  createSignatureSlice.actions;

export default createSignatureSlice.reducer;