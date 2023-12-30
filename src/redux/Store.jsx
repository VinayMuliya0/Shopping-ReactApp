import { configureStore } from '@reduxjs/toolkit';
import signupSlice from './features/signup/signupSlice';
import product from './features/product/product';

export const store = configureStore({
    reducer: {
        signup: signupSlice,
        product

    }
})