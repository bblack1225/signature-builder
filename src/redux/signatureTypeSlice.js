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

export const selectSignatureType = (state) => state.signatureType.type;

export default signatureTypeSlice.reducer;