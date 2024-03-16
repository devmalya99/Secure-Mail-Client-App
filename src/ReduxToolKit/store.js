

import { configureStore } from "@reduxjs/toolkit";
import emailReducer from './mailSlice';

export const store = configureStore({
    reducer: {
        // Add the reducer here
        mail: emailReducer
    },
});