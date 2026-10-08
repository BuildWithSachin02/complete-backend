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
export const updateBooks = createAsyncThunk('update/book', async ({ id, book }) => {
    const res = await api.put(`/api/books/updatebook?id=${id}`, book)
    return res.data
})

//DELETE -REQUIEST
export const deleteBooks = createAsyncThunk('delete/books', async (id) => {
    const res = await api.delete(`/api/books/deletebooks?id=${id}`)
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
                state.loader = false

                // PUT request successful ho gayi.
                // Backend + MongoDB mein book update ho chuki hai.
                //
                // Lekin React/Redux ko automatically nahi pata chalega
                // ki MongoDB mein book update ho gayi hai.
                //
                // Example:
                //
                // Redux ke paas:
                // "Atomic Habits"
                //
                // MongoDB mein update hone ke baad:
                // "Atomic Habits Updated"
                //
                // MongoDB ko pata hai ki value change ho gayi,
                // lekin Redux ke paas abhi bhi purani value ho sakti hai.
                //
                // Isliye backend se updated book lekar
                // Redux ke andar bhi purani book ko update karenge.


                // Backend ne updated book "result" ke andar bheji hai.
                //
                // Example:
                //
                // action.payload = {
                //     status: true,
                //     message: "updated successfully",
                //     result: {
                //         _id: "123",
                //         bookName: "Atomic Habits Updated"
                //     }
                // }
                //
                // Hume sirf updated book chahiye,
                // isliye result ko ek variable mein rakh liya.

                const updateBook = action.payload.result


                // Ab hume Redux ke books array mein ye dekhna hai
                // ki updated book pehle kis position par thi.
                //
                // Example:
                //
                // state.books = [
                //     Harry Potter,       // index 0
                //     Atomic Habits,      // index 1
                //     Rich Dad Poor Dad   // index 2
                // ]
                //
                // Agar updated book ki _id "Atomic Habits" wali _id ke
                // saath match ho gayi,
                // toh findIndex() hume 1 dega.
                //
                // findIndex() ka kaam:
                //
                // book mili     → uska index dega
                // book nahi mili → -1 dega

                const index = state.books.findIndex(
                    (book) => book._id === updateBook._id
                )


                // Ab checkpoint lagaya hai.
                //
                // Agar index -1 nahi hai,
                // iska matlab book hume mil gayi.
                //
                // Example:
                //
                // index = 1
                //
                // 1 !== -1 → true
                //
                // Matlab:
                // "Haan, book mil gayi."
                //
                // Ab usi position par updated book rakh do.
                //
                // Pehle:
                //
                // index 0 → Harry Potter
                // index 1 → Atomic Habits
                // index 2 → Rich Dad Poor Dad
                //
                // Update ke baad:
                //
                // index 0 → Harry Potter
                // index 1 → Atomic Habits Updated
                // index 2 → Rich Dad Poor Dad

                if (index !== -1) {
                    state.books[index] = updateBook
                } else {

                    // Agar index -1 hai,
                    // iska matlab updated book Redux ke books array mein mili hi nahi.
                    //
                    // Example:
                    //
                    // findIndex() → -1
                    //
                    // Matlab:
                    // "Mujhe ye book nahi mili."
                    //
                    // Isliye error bata rahe hain.

                    throw new Error('cant find this book')
                }
            })

            .addCase(updateBooks.rejected, (state, action) => {

                // Agar PUT request fail ho gayi,
                // toh error message Redux ke err mein save kar do.

                state.err = action.error.message

                // Request complete ho gayi,
                // isliye loader band kar do.

                state.loader = false
            })
        builder.addCase(deleteBooks.pending, (state, action) => {
            state.loader = true
            state.err = null
        })
            .addCase(deleteBooks.fulfilled, (state, action) => {
                state.loader = false
                const deleteBookID = action.payload.result._id // pehle mene manga liya h ki user ko konsa book delte krna uski id 
                //abb me filter lgna chhta huki jab koi user ne id di aur hmre database me boh id match hui toh usse delete krdo 
                // '1' !== "2"  => true h delte nhi hoga
                // "2" !== "2" => false delete hoga condion wrong h yeh jab ki dono id same h toh delte hoga 
                state.books = state.books.filter((book)=> book._id !== deleteBookID) 
            })
            .addCase(deleteBooks.rejected, (state, action) => {
                state.loader = false
                state.err = action.error.message
            })
    }
})
export default bookSlice.reducer