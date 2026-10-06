import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/auth.Slice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        // books: bookReducer
    }
})