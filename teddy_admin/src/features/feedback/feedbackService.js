import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { feedbackService } from './feedbackSlice'

const initialState = {
  feedbacks: [],
  feedback: {},
  updatedFeedback: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: '',
  message: ''
}

export const getFeedbacks = createAsyncThunk('feedback/getFeedbacks', async (status, thunkAPI) => {
  try {
    if (status) {
      return await feedbackService.getFeedbacks(status)
    } else {
      return await feedbackService.getFeedbacks()
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getFeedbackById = createAsyncThunk('feedback/getFeedback', async (id, thunkAPI) => {
  try {
    return await feedbackService.getFeedbackById(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateFeedbackStatus = createAsyncThunk(
  'feedback/updateFeedbackStatus',
  async (feedbackData, thunkAPI) => {
    try {
      return await feedbackService.updateFeedbackStatus(feedbackData.id, {
        status: feedbackData?.status
      })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction('ReverAll')

export const feedbackSlice = createSlice({
  name: 'feedback',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedbacks.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFeedbacks.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.feedbacks = action.payload.feedbacks
      })
      .addCase(getFeedbacks.rejected, (state) => {
        state.isError = true
      })
      .addCase(getFeedbackById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getFeedbackById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.feedback = action.payload.feedback
      })
      .addCase(getFeedbackById.rejected, (state) => {
        state.isError = true
      })
      .addCase(updateFeedbackStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateFeedbackStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedFeedback = action.payload.updatedFeedback
      })
      .addCase(updateFeedbackStatus.rejected, (state) => {
        state.isError = true
      })
      .addCase(resetState, () => initialState)
  }
})

export default feedbackSlice.reducer
