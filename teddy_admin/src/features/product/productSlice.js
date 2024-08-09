import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit'
import { productService } from './productService'

const initialState = {
  products: [],
  product: {},
  createdProduct: {},
  updatedProduct: {},
  deletedProduct: {},

  isError: false,
  isLoading: false,
  isSuccess: false,
  status: '',
  message: ''
}

export const getProducts = createAsyncThunk('product/getProducts', async (thunkAPI) => {
  try {
    return await productService.getProducts()
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const getProductById = createAsyncThunk('product/getProduct', async (id, thunkAPI) => {
  try {
    return await productService.getProductById(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const createProduct = createAsyncThunk('product/createProduct', async (productData, thunkAPI) => {
  try {
    return await productService.createProduct({
      name: productData?.name,
      description: productData?.description,
      priceSale: productData?.priceSale,
      price: productData?.price,
      quantity: productData?.quantity,
      warranty: productData?.warranty,
      brand: productData?.brand,
      category: productData?.category,
      images: productData?.images,
      tags: productData?.tags,
      createdBy: productData?.createdBy,
      colors: productData?.colors,
      options: productData?.options,
      types: productData?.types,
      attributes: productData?.attributes
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateProduct = createAsyncThunk('product/updateProduct', async (productData, thunkAPI) => {
  try {
    return await productService.updateProduct(productData.id, {
      name: productData?.name,
      description: productData?.description,
      priceSale: productData?.priceSale,
      price: productData?.price,
      quantity: productData?.quantity,
      warranty: productData?.warranty,
      brand: productData?.brand,
      category: productData?.category,
      images: productData?.images,
      tags: productData?.tags,
      colors: productData?.colors,
      options: productData?.options,
      types: productData?.types
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const updateProductPrice = createAsyncThunk('product/updateProductPrice', async (productData, thunkAPI) => {
  try {
    return await productService.updateProductPrice(productData.id, {
      price: productData?.price,
      quantity: productData?.quantity,
      option: productData?.option,
      color: productData?.color,
      switch: productData?.type
    })
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteProduct = createAsyncThunk('product/deleteProduct', async (id, thunkAPI) => {
  try {
    return await productService.deleteProduct(id)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteProductPrice = createAsyncThunk('product/deleteProductPrice', async (productData, thunkAPI) => {
  try {
    return await productService.deleteProductPrice(productData.productId, productData.attributesId)
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const resetState = createAction('ReverAll')

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.products = action.payload.products
      })
      .addCase(getProducts.rejected, (state) => {
        state.isError = true
      })
      .addCase(getProductById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.product = action.payload
      })
      .addCase(getProductById.rejected, (state) => {
        state.isError = true
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.createdProduct = action.payload.product
      })
      .addCase(createProduct.rejected, (state) => {
        state.isError = true
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.updatedProduct = action.payload
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isError = true
      })
      .addCase(updateProductPrice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(updateProductPrice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.product = action.payload
      })
      .addCase(updateProductPrice.rejected, (state) => {
        state.isError = true
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.deletedProduct = action.payload
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isError = true
      })
      .addCase(deleteProductPrice.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteProductPrice.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.product = action.payload
      })
      .addCase(deleteProductPrice.rejected, (state) => {
        state.isError = true
      })
      .addCase(resetState, () => initialState)
  }
})

export default productSlice.reducer
