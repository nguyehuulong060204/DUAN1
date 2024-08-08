import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { eventService } from './eventService'

const initialState = {
  events: [],
  event: {},
  createdEvent: {},
  updatedEvent: {},
  deleteEvent: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: '',
  message: ''
}

export const getEvents = createAsyncThunk('event/getEvents', async (thunkAPI) => {
  try {
    return await eventService.getEvents()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getEventById = createAsyncThunk('event/getEvent', async (id, thunkAPI) => {
  try {
    return await eventService.getEventById(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createEvent = createAsyncThunk('event/createEvent', async (eventData, thunkAPI) => {
  try {
    return await eventService.createEvent({
      name: eventData?.name,
      description: eventData?.description,
      time: eventData?.time,
      location: eventData?.location,
      startDate: eventData?.startDate,
      endDate: eventData?.endDate,
      images: eventData?.images,
      tag: eventData?.tag,
      members: eventData?.members,
      createdBy: eventData?.createdBy,
      type: eventData?.type,
      title: eventData?.title
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateEvent = createAsyncThunk('event/updateEvent', async (eventData, thunkAPI) => {
  console.log(eventData)
  try {
    return await eventService.updateEvent(eventData.id, {
      name: eventData?.name,
      description: eventData?.description,
      time: eventData?.time,
      location: eventData?.location,
      startDate: eventData?.startDate,
      endDate: eventData?.endDate,
      images: eventData?.images,
      tag: eventData?.tag,
      members: eventData?.members,
      createdBy: eventData?.createdBy,
      type: eventData?.type,
      title: eventData?.title
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteEvent = createAsyncThunk('event/deleteEvent', async (id, thunkAPI) => {
  try {
    return await eventService.deleteEvent(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const resetState = createAction('ReverAll')

export const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.events = action.payload.events
      })
      .addCase(getEvents.rejected, (state) => {
        state.isError = true
      })
      .addCase(getEventById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getEventById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.event = action.payload.event
      })
      .addCase(getEventById.rejected, (state) => {
        state.isError = true
      })
      .addCase(createEvent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.createdEvent = action.payload.event
      })
      .addCase(createEvent.rejected, (state) => {
        state.isError = true
      })
      .addCase(updateEvent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedEvent = action.payload
      })
      .addCase(updateEvent.rejected, (state) => {
        state.isError = true
      })
      .addCase(deleteEvent.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.deleteEvent = action.payload
      })
      .addCase(deleteEvent.rejected, (state) => {
        state.isError = true
      })
      .addCase(resetState, () => initialState)
  }
})

export default eventSlice.reducer
