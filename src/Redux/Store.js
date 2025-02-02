import { configureStore } from '@reduxjs/toolkit';
import ProductReducer from './Slices/ProductSlice.js';
import productDetailsReducer from './Slices/ProductDetailsSlice.js';
import CreateProductReducer from './Slices/CreateProductSlice.js';
// import cartReducer from './slices/cartSlice';
import authReducer from './Slices/authSlice';

const store = configureStore({
    reducer: {
        products: ProductReducer,
        productDetails: productDetailsReducer,
        createProduct: CreateProductReducer,
        auth: authReducer,
    },
});

export default store;
