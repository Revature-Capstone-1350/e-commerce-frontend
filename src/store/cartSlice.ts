import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Product from '../models/Product';
import { RootState } from './store';


//setup user interface to match response object

interface CartState {
  cartContents: Product[];
}

//setup of initial state to show before change
const initialState: CartState = {
  cartContents: []
}


/*userslice is the main method functionality for creating state and changing it.
it takes is a name parameter, initialstate which shows the change to new state, and reducers which is an object of all the methods that alter state and their logic. 
Adding methods in the reducers object also automatically creates an action creator which is used to initiate state changes on the UI. 
*/
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Product>) => {
      (state.cartContents.map(product => {
        if (product.id === action.payload.id) {
          product.quantity++
          state.cartContents.splice(product.quantity)

        }
      })) 
      state.cartContents.push(action.payload)
    },
  }
});


// we export the reducers action creators to allow for them to be used on the UI
export const { setCart } = cartSlice.actions

export const selectCart = (state: RootState) => state.cart.cartContents;

//export that is used in the store
export default cartSlice.reducer 