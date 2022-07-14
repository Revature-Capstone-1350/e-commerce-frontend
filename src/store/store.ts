import { configureStore } from "@reduxjs/toolkit";
import orderReducer from './orderSlice'

export const store = configureStore({
  reducer: {
    orders: orderReducer
  },
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;