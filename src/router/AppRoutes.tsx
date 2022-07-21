import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Cart } from '../components/cart/Cart';
import Checkout from '../components/checkout/Checkout';
import { DisplayProducts } from '../components/display-products/DisplayProducts';
import ProductDetail from '../components/display-products/ProductDetails';
import Login from '../components/login/Login';
import Register from '../components/register/Register';

export const AppRoutes: React.FC<unknown> = () => (
    <Routes>
        <Route path='/' element={<DisplayProducts />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/:id/" element={<ProductDetail />} />
    </Routes>
);
