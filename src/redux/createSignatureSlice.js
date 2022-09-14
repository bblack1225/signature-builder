import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isCreate: false
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
    }
})


export const { createSignature, completeSignature } = createSignatureSlice.actions;

export default createSignatureSlice.reducer;