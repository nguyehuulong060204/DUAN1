import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { orderService } from './orderService'

const initialState = {
  orders: [],
  order: {},
  updatedOrder: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: '',
  message: ''
}

export const getAllOrder = createAsyncThunk('order/getAllOrder', async (orderData, thunkAPI) => {
  try {
    return await orderService.getAllOrder(orderData ? orderData : {})
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateStatus = createAsyncThunk('order/updateStatus', async (orderData, thunkAPI) => {
  try {
    return await orderService.updateStatus({ orderId: orderData.id, orderStatus: orderData.status })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getOrderById = createAsyncThunk('order/getOrderById', async (orderId, thunkAPI) => {
  try {
    return await orderService.getOrderById(orderId)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateOrderWhenUserBySuccess = createAsyncThunk('order/buySuccess', async (orderData, thunkAPI) => {
  try {
    return await orderService.updateOrderWhenUserBySuccess(orderData)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const resetState = createAction('ReverAll')

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrder.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllOrder.fulfilled, (state, { payload }) => {
        state.isLoading = false
        state.isSuccess = true
        state.orders = payload.orders
      })
      .addCase(getAllOrder.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(updateStatus.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.updatedOrder = action.payload
      })
      .addCase(updateStatus.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(getOrderById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.order = action.payload.order
      })
      .addCase(getOrderById.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(updateOrderWhenUserBySuccess.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateOrderWhenUserBySuccess.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(updateOrderWhenUserBySuccess.rejected, (state) => {
        state.isLoading = false
        state.isError = true
      })
      .addCase(resetState, () => initialState)
  }
})

export default orderSlice.reducer
