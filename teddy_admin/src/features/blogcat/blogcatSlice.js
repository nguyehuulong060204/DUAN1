import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { blogCatService } from './blogcatService'

const initialState = {
  blogCats: [],
  blog: {},
  createdBlog: {},
  updatedBlog: {},
  deletedBlog: {},
  isError: false,
  isLoading: false,
  isSuccess: false,
  status: '',
  message: ''
}

export const getBlogCats = createAsyncThunk('blogCat/getBlogCats', async (thunkAPI) => {
  try {
    return await blogCatService.getBlogCats()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getBlogcatById = createAsyncThunk('blogCat/getBlogCat', async (id, thunkAPI) => {
  try {
    return await blogCatService.getBlogCatById(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createBlogCat = createAsyncThunk('blogCat/createBlogCat', async (blogCatData, thunkAPI) => {
  try {
    return await blogCatService.createBlogCat({
      name: blogCatData?.name,
      description: blogCatData?.description
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateBlogCat = createAsyncThunk('blogCat/updateBlogCat', async (blogCatData, thunkAPI) => {
  try {
    return await blogCatService.updateBlogCat(blogCatData.id, {
      name: blogCatData?.name,
      description: blogCatData?.description
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteBlogCat = createAsyncThunk('blogCat/deleteBlogCat', async (id, thunkAPI) => {
  try {
    return await blogCatService.deleteBlogCat(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const resetState = createAction('ReverAll')

export const blogCatSlice = createSlice({
  name: 'blogCat',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogCats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogCats.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.blogCats = action.payload.blogCategories
      })
      .addCase(getBlogCats.rejected, (state) => {
        state.isError = true
      })
      .addCase(getBlogcatById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogcatById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.blog = action.payload.category
      })
      .addCase(getBlogcatById.rejected, (state) => {
        state.isError = true
      })
      .addCase(createBlogCat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBlogCat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.createdBlog = action.payload.blogCat
      })
      .addCase(createBlogCat.rejected, (state) => {
        state.isError = true
      })
      .addCase(updateBlogCat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBlogCat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedBlog = action.payload
      })
      .addCase(updateBlogCat.rejected, (state) => {
        state.isError = true
      })
      .addCase(deleteBlogCat.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBlogCat.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.deletedBlog = action.payload
      })
      .addCase(deleteBlogCat.rejected, (state) => {
        state.isError = true
      })
      .addCase(resetState, () => initialState)
  }
})

export default blogCatSlice.reducer
