import { configureStore } from '@reduxjs/toolkit'
import authSlice from '~/feature/auth/authSlice'
import blogSlice from '~/feature/blog/blogSlice'
import brandSelice from '~/feature/brand/brandSlice'
import eventSlice from '~/features/event/eventSlice'
import memberSlice from '~/feature/member/memberSlice'
import productSlice from '~/feature/product/productSlice'
import uploadSlice from '~/features/upload/uploadSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    blog: blogSlice,
    brand: brandSelice,
    member: memberSlice,
    event: eventSlice,
    upload: uploadSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
