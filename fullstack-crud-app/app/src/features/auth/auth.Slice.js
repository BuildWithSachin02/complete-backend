import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/axios.js'

const initialState = {
    loader: false,
    user: null,
    error: null,
}

export const singUp = createAsyncThunk(
  "/api/auth/signup",
  async (formData) => {

    // simple validation
    if (!formData.name || !formData.email || !formData.password) {
      throw new Error("All fields are required");
    }

    if (formData.password.length < 8) {
      throw new Error("Password must be at least 8 characters");
    }

    // validation pass hone ke baad hi API call
    const res = await api.post("/api/auth/signup", formData);

    return res.data;
  }
);

export const login = createAsyncThunk('auth/login', async (formData) => {
    const res = await api.get('/api/auth/signin', formData)
    return res.data
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(singUp.pending, (state) => {
            state.loader = true
        })
            .addCase(singUp.fulfilled, (state, action) => {
                state.loader = false
                state.user = action.payload
            })
            .addCase(singUp.rejected, (state, action) => {
                state.loader = false,
                    state.error = action.error.message
            });
        builder.addCase(login.pending, (state) => {
            state.loader = true
        })
            .addCase(login.fulfilled, (state, action) => {
                state.loader = false
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.loader = false
                state.error = action.error.message
            })
    }
})

export default authSlice.reducer