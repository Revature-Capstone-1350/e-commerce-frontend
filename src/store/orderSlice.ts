import { createSlice, PayloadAction } from '@reduxjs/toolkit'


export interface CounterState {
  value: number;
}

const initialState = {
value: 0
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  }
});

export const { increment, decrement, incrementByAmount } = orderSlice.actions

export default orderSlice.reducer