import React from 'react';
import Product from '../models/Product';

interface CartContextState {
    cart: Product[];
    setCart: (cart: Product[]) => void;
}

// Define the Cart Context
// This will provided at the top level of the component hierarchy
// Then any child component will be able to access the cart info
// by using the useContext hook as follows:
// const { cart, setCart } = useContext(CartContext);
// And then the cart can be used and updated in a standard fashion
export const CartContext = React.createContext<CartContextState>({
    cart: [],
    setCart: () => {},
});
