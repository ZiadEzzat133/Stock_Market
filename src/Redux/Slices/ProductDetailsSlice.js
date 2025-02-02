import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch product details
export const fetchProductDetails = createAsyncThunk(
    'productDetails/fetchProductDetails',
    async (productId) => {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        return response.data;
    }
);

// Thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
    'productDetails/fetchSimilarProducts',
    async (category) => {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
        return response.data;
    }
);

const initialState = {
    product: null,
    loading: false,
    error: null,
    similarProducts: [],
    similarProductsLoading: false,
    similarProductsError: null,
};

const ProductDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductDetails.pending, (state) => {
                state.loading = true;
                state.product = null; 
                state.error = null; 
            })
            .addCase(fetchProductDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(fetchProductDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder
            .addCase(fetchSimilarProducts.pending, (state) => {
                state.similarProductsLoading = true;
                state.similarProducts = []; 
                state.similarProductsError = null;
            })
            .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
                state.similarProductsLoading = false;
                state.similarProducts = action.payload;
            })
            .addCase(fetchSimilarProducts.rejected, (state, action) => {
                state.similarProductsLoading = false;
                state.similarProductsError = action.error.message;
            });
    },
});

export default ProductDetailsSlice.reducer;
