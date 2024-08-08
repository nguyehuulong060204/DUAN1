import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { blogService } from './blogService'

const initialState = {
  blogs: [],
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

export const getBlogs = createAsyncThunk('blogs/getBlogs', async (thunkAPI) => {
  try {
    return await blogService.getBlogs()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getBlogById = createAsyncThunk('blog/getBlog', async (id, thunkAPI) => {
  try {
    return await blogService.getBlogById(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createBlog = createAsyncThunk('blog/createBlog', async (blogData, thunkAPI) => {
  try {
    return await blogService.createBlog({
      name: blogData?.name,
      content: blogData?.content,
      tag: blogData?.tag,
      blogCategory: blogData?.blogCategory,
      createdBy: blogData?.createdBy,
      thumbnail: blogData?.thumbnail
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateBlog = createAsyncThunk('blog/updateBlog', async (blogData, thunkAPI) => {
  try {
    return await blogService.updateBlog(blogData.id, {
      name: blogData?.name,
      content: blogData?.content,
      tag: blogData?.tag,
      blogCategory: blogData?.blogCategory,
      createdBy: blogData?.createdBy,
      thumbnail: blogData?.thumbnail
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteBlog = createAsyncThunk('blog/deleteBlog', async (id, thunkAPI) => {
  try {
    return await blogService.deleteBlog(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const resetState = createAction('ReverAll')

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.blogs = action.payload.blogs
      })
      .addCase(getBlogs.rejected, (state) => {
        state.isError = true
      })
      .addCase(getBlogById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.blog = action.payload.blog
      })
      .addCase(getBlogById.rejected, (state) => {
        state.isError = true
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.createdBlog = action.payload.blog
      })
      .addCase(createBlog.rejected, (state) => {
        state.isError = true
      })
      .addCase(updateBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedBlog = action.payload.updatedBlog
      })
      .addCase(updateBlog.rejected, (state) => {
        state.isError = true
      })
      .addCase(deleteBlog.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.deletedBlog = action.payload
      })
      .addCase(deleteBlog.rejected, (state) => {
        state.isError = true
      })
      .addCase(resetState, () => initialState)
  }
})

export default blogSlice.reducer
