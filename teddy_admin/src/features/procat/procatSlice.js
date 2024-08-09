import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { procatService } from './procatService'

const initialState = {
  procats: [],
  procat: {},
  createdProcat: {},
  updatedProcat: {},
  deletedProcat: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: '',
  message: ''
}

export const getProcats = createAsyncThunk('procat/getProcats', async (thunkAPI) => {
  try {
    return await procatService.getProcat()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getProcatById = createAsyncThunk('procat/getProcat', async (id, thunkAPI) => {
  try {
    return await procatService.getProcatById(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createProcat = createAsyncThunk('procat/createProcat', async (procatData, thunkAPI) => {
  try {
    return await procatService.createProcat({
      name: procatData?.name,
      description: procatData?.description,
      tags: procatData?.tags
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateProcat = createAsyncThunk('procat/updateProcat', async (procatData, thunkAPI) => {
  try {
    return await procatService.updateProcat(procatData.id, {
      name: procatData?.name,
      description: procatData?.description,
      tags: procatData?.tags
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteProcat = createAsyncThunk('procat/deleteProcat', async (id, thunkAPI) => {
  try {
    return await procatService.deleteProcat(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const addProductToCategory = createAsyncThunk('procat/addProductToCategory', async (proCatData, thunkAPI) => {
  try {
    return await procatService.addProductToCategory({
      proCatId: proCatData?.catId,
      productId: proCatData?.productId
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const removeProductToCategory = createAsyncThunk(
  'procat/removeProductToCategory',
  async (proCatData, thunkAPI) => {
    try {
      return await procatService.removeProductFromCategory({
        proCatId: proCatData?.catId,
        productId: proCatData?.productId
      })
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const resetState = createAction('ReverAll')

export const procatSlice = createSlice({
  name: 'procat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProcats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProcats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.procats = action.payload.productCategories
      })
      .addCase(getProcats.rejected, (state) => {
        state.isError = true
      })
      .addCase(getProcatById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProcatById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.procat = action.payload.category
      })
      .addCase(getProcatById.rejected, (state) => {
        state.isError = true
      })
      .addCase(createProcat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProcat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.createdProcat = action.payload.productCat
      })
      .addCase(createProcat.rejected, (state) => {
        state.isError = true
      })
      .addCase(updateProcat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProcat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedProcat = action.payload.updatedCategory
      })
      .addCase(updateProcat.rejected, (state) => {
        state.isError = true
      })
      .addCase(deleteProcat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProcat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.deletedProcat = action.payload
      })
      .addCase(deleteProcat.rejected, (state) => {
        state.isError = true
      })
      .addCase(addProductToCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(addProductToCategory.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(addProductToCategory.rejected, (state) => {
        state.isError = true
      })
      .addCase(removeProductToCategory.pending, (state) => {
        state.isLoading = true
      })
      .addCase(removeProductToCategory.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
      })
      .addCase(removeProductToCategory.rejected, (state) => {
        state.isError = true
      })
      .addCase(resetState, () => initialState)
  }
})

export default procatSlice.reducer
