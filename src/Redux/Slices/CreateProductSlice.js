import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createProduct = createAsyncThunk('createProduct/createProduct', async (newProduct) => {
    const response = await axios.post('https://fakestoreapi.com/products', newProduct);
    return response.data;
});
export const GetAllCategories = createAsyncThunk('createProduct/GetAllCategories', async () => {
    const response = await axios.get('https://fakestoreapi.com/products/categories');
    return response.data;
});

const initialState = {
    product: null,
    loading: false,
    error: null,
    successMessage: '',
    done: false,
    categories: [],
};

const CreateProductSlice = createSlice({
    name: 'createProduct',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.product = action.payload;
                state.successMessage = 'Product created successfully!';
                state.done = true;
            })
            .addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

        builder.addCase(GetAllCategories.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(GetAllCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        }
        );
        builder.addCase(GetAllCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    },
});

export default CreateProductSlice.reducer;
