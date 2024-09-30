import { configureStore } from '@reduxjs/toolkit';
// reducer import
import customizationReducer from './customizationReducer';
import userReducer from './userReducer';
// ==============================|| COMBINE REDUCER ||============================== //

export const reducer = configureStore({
    reducer: {
        customization: customizationReducer,
        user: userReducer
    }
});
