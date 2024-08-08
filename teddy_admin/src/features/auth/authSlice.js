import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authSerice } from './authService'

const userDefaultState = JSON.parse(localStorage.getItem('user_data')) || null

const initialState = {
  user: userDefaultState,
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: '',
  message: ''
}

export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authSerice.login(user)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    return await authSerice.logout()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.status = action.payload.status
        state.user = action.payload
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.user = null
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
        state.user = null
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.user = null
      })
  }
})

export default authSlice.reducer
