import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getFirebaseData } from "../../database/firebaseUtils";


const initialState = {
    products: [],
    isLoading: false,
    isError: false,
    error: null,
}


export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {

    let data = await getFirebaseData();
  return data;

})


const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.isError = false;
            state.isLoading = true;
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.isLoading = false;
           state.products = (action.payload);
            
        })
        builder.addCase(getProducts.rejected, (state, action) => {
            state.isError = true;
            state.error = action.payload.error?.message;
        })
    }
});


export default productsSlice.reducer;