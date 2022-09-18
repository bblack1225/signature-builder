import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    type: 'B'
}

export const signatureTypeSlice = createSlice({
    name: 'signatureType',
    initialState,
    reducers: {
        setSignatureType: (state, action) => {
            state.type = action.payload;
        }
    }
})

export const { setSignatureType } = signatureTypeSlice.actions;

export default signatureTypeSlice.reducer;