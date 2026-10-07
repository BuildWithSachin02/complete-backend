import { configureStore } from "@reduxjs/toolkit"
import authReducer from '../features/auth/auth.Slice.js'
import bookReducer from '../features/books/books.Slice.js'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        books: bookReducer
    }
})