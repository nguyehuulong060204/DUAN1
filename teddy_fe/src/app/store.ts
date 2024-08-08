import { configureStore } from '@reduxjs/toolkit'
import authSlice from '~/feature/auth/authSlice'
import blogSlice from '~/feature/blog/blogSlice'
import productSlice from '~/feature/product/productSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    blog: blogSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})