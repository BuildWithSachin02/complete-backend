import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../../api/axios'

const initialState = {
    books: [],
    loader: null,
    err: null
}
//GET -REQUEST
export const getBooks = createAsyncThunk('get/books', async (data) => {
    try {
        const res = await api.get('/api/books/allbooks')
        return res.data
    } catch (err) {
        console.log(err.message)
    }
})

//POST - REQUIEST 
export const postBooks = createAsyncThunk('post/books', async (formData) => {
    if (
        !formData.bookName.trim() ||
        !formData.bookAuthor.trim() ||
        !formData.bookCategory.trim() ||
        !formData.bookPublishYear ||
        !formData.bookMessage.trim()
    ) {
        throw new Error("Fill all required fields");
    }
    const res = await api.post('api/books/postbooks', formData)
    return res.data
})

//PUT REQUEST
export const updateBooks = createAsyncThunk('update/book', async (id, book) => {
    const res = await api.put('/api/books/updatebook/', id, book)
    return res.data
})


const bookSlice = createSlice({
    name: 'bookSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getBooks.pending, (state, action) => {
            state.loader = true
            state.err = null
        })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.loader = false
                state.books = action.payload.result
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.loader = false
                state.err = action.error.message
            });
        builder.addCase(postBooks.pending, (state, action) => {
            state.loader = true
            state.err = null
        })
            .addCase(postBooks.fulfilled, (state, action) => {
                state.loader = false
                state.books = action.payload
            })
            .addCase(postBooks.rejected, (state, action) => {
                state.loader = false
                state.err = action.error.message
            });
        builder.addCase(updateBooks.pending, (state, action) => {
            state.loader = true
            state.user = null
        })
            .addCase(updateBooks.fulfilled, (state, action) => {
                state.books = action.payload
                state.loader = false
            })
            .addCase(updateBooks.rejected, (state, action) => {
                state.err = action.error.message
                state.loader = false
            })
    }
})
export default bookSlice.reducer