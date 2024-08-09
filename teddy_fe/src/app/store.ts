import { configureStore } from '@reduxjs/toolkit'
import authSlice from '~/feature/auth/authSlice'
import blogSlice from '~/feature/blog/blogSlice'
import brandSelice from '~/feature/brand/brandSlice'
import productSlice from '~/feature/product/productSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    blog: blogSlice,
    brand: brandSelice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})