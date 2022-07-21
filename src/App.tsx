import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { CartContext } from './context/cart.context';
import ProductItem from './models/Product';
import { AppRoutes } from './router/AppRoutes';

/**
 *@returns {void}
 */
function App() {
    const [cart, setCart] = useState<ProductItem[]>([]);
    const value = { cart, setCart };

    return (
        <CartContext.Provider value={value}>
            <Router>
                <Navbar/>
                <AppRoutes></AppRoutes>
            </Router>
        </CartContext.Provider>
    );
}

export default App;
