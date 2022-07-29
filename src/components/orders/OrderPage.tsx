/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SyntheticEvent, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import { apiCreateProduct, apiGetOrdersByUserId } from '../../remote/e-commerce-api/productService';
import CreateProductRequest from '../../models/CreateProductRequest';
import { useAppSelector } from '../../store/hooks';
import { UserState, currentUser } from '../../store/userSlice';
import OrderDTO from '../dtos/OrderDTO';
import AddressDTO from '../dtos/AddressDTO';
import ProductInfo from '../dtos/ProductInfo';

const CreateDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    text-align: center;
`;
const TitleDiv = styled.div`
    display: flex;
    justify-content: center;
`;

let hasSentReq = false;

export const OrdersView = () => {
    // initializing state
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageS, setImageS] = useState<string>('');
    const [imageM, setImageM] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    const [orders, setOrders] = useState<OrderDTO[]>([new OrderDTO(0,0,new AddressDTO(0,'','','','',''),[],'')]);
    // 
    // Grabing the current user from state
    const user: UserState = useAppSelector(currentUser);

    const getOrders = async function() {
        const orderResp:OrderDTO[] = (await apiGetOrdersByUserId(''+user.id, user.token)).payload as unknown as OrderDTO[];
        setOrders(orderResp);
    };

    useEffect(() => {
        console.log('State \'orders\' was updated');
        console.log(orders);
    }, [orders]);


    useEffect(() => {
        if (!hasSentReq) {
            hasSentReq = true;
            console.log('requesting orders form API');
            getOrders();
        }
    }, []);


    const sendNewProduct = async () => {
        const priceNum = parseFloat(price).toFixed(2); // converts price to a number with 2 decimal places

        if (!name || !description || !price || !imageS || !imageM) { // If fields are empty, a message will display an error
            setMessage('All fields must be completed');
        } else if (!Number(price)) { // If price is not a number, a message will display an error
            setMessage('Price must be a number');
        } else if (category === 0) { // If category hasn't been selected, a message will display an error
            setMessage('Please select a category for this image');
        } else { // If all fields and category has been set, send the information to the API
            const productResponse: CreateProductRequest = {
                category: category,
                name: name,
                description: description,
                price: +priceNum,
                imageUrlS: imageS,
                imageUrlM: imageM
            };

            try { // This Try/Catch block is needed to handle Axios exceptions
                const response = await apiCreateProduct(productResponse, user.token); // Sends login request to API
                if (response.status == 201) { // If the response is not in the 200 range a error message will be displayed
                    setMessage('New Product Created');
                }
            } catch (err: any) { // The Axios error is cast as any in order to be able to access the message inside the error object
                console.log(err);

                setMessage(err.response.data.message);  // Renders the error message sent from the API on screen 
            }
        };

    };
    return (
        <React.Fragment>
            {orders.map((order) => (
                            <div key={order.orderId}>
                                <p>{order.orderId}</p>
                            </div>
                        ))}
        </React.Fragment>
    );
};
