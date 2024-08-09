import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { scheduleService } from './scheduleService'

const initialState = {
  schedules: [],
  schedule: {},
  createdSchedule: {},
  updatedSchedule: {},
  deletedSchedule: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: '',
  message: ''
}

export const getAllSchedule = createAsyncThunk('schedule/getAll', async (eventId, thunkAPI) => {
  try {
    return await scheduleService.getAllSchedule(eventId)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getScheduleById = createAsyncThunk('schedule/getSchedule', async (id, thunkAPI) => {
  try {
    return await scheduleService.getSchedule(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createSchedule = createAsyncThunk('schedule/createSchedule', async (scheduleData, thunkAPI) => {
  try {
    return await scheduleService.createSchedule({
      name: scheduleData?.name,
      time: scheduleData?.time,
      date: scheduleData?.date,
      images: scheduleData?.images,
      eventId: scheduleData?.eventId,
      type: scheduleData?.type
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateSchedule = createAsyncThunk('schedule/updateSchedule', async (scheduleData, thunkAPI) => {
  try {
    return await scheduleService.updateSchedule(scheduleData.id, {
      name: scheduleData?.name,
      time: scheduleData?.time,
      date: scheduleData?.date,
      images: scheduleData?.images,
      eventId: scheduleData?.eventId,
      type: scheduleData?.type
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteSchedule = createAsyncThunk('schedule/deleteSchedule', async (id, thunkAPI) => {
  try {
    return await scheduleService.deleteSchedule(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const resetState = createAction('ReverAll')

export const schedule = createSlice({
  name: 'schedule',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllSchedule.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllSchedule.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.schedules = action.payload.schedules
      })
      .addCase(getAllSchedule.rejected, (state) => {
        state.isError = true
      })
      .addCase(getScheduleById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getScheduleById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.schedule = action.payload.schedule
      })
      .addCase(getScheduleById.rejected, (state) => {
        state.isError = true
      })
      .addCase(createSchedule.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createSchedule.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.createdSchedule = action.payload.schedule
      })
      .addCase(createSchedule.rejected, (state) => {
        state.isError = true
      })
      .addCase(updateSchedule.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateSchedule.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedSchedule = action.payload
      })
      .addCase(updateSchedule.rejected, (state) => {
        state.isError = true
      })
      .addCase(deleteSchedule.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteSchedule.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.deletedSchedule = action.payload
      })
      .addCase(deleteSchedule.rejected, (state) => {
        state.isError = true
      })
      .addCase(resetState, () => initialState)
  }
})

export default schedule.reducer
