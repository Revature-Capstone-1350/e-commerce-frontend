import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from './userSlice';

// Where state is stored
export const store = configureStore({
  reducer: {
    user: userReducer
  },
});

// Exports that make it easier in using methods without setting types each time
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;