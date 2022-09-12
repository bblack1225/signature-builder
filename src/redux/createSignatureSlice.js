import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isCreate: false
}

export const createSignatureSlice = createSlice({
    name: 'createSignature',
    initialState,
    reducers: {
        create: (state) => {
           state.isCreate = true;
        },
        complete:(state) => {
            state.isCreate = false;
        },
    }
})


export const { create, complete } = createSignatureSlice.actions;

export default createSignatureSlice.reducer;