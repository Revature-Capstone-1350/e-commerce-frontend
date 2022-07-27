/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, MenuItem, Select } from '@mui/material';
import styled from 'styled-components';
import { apiCreateProduct } from '../../remote/e-commerce-api/productService';
import CreateProductRequest from '../../models/CreateProductRequest';
import { useAppSelector } from '../../store/hooks';
import { UserState, currentUser } from '../../store/userSlice';

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


export const CreateProducts = () => {
    // initializing state
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [imageS, setImageS] = useState<string>('');
    const [imageM, setImageM] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    // Grabing the current user from state
    const user: UserState = useAppSelector(currentUser);

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
            <TitleDiv>
                <h1>Create a new product</h1>
            </TitleDiv>
            <CreateDiv>
                <br />

                <br />
                <Box
                    component='form'
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete='off'
                >
                    <FormControl>
                        <InputLabel htmlFor='component-outlined'>Name</InputLabel>
                        <OutlinedInput
                            id='component-outlined'
                            value={name}
                            label='Name'
                            onChange={(e: SyntheticEvent) => setName((e.target as HTMLInputElement).value)} />

                    </FormControl>
                    <br />
                    <FormControl>
                        <InputLabel htmlFor='component-outlined'>Description</InputLabel>
                        <OutlinedInput
                            id='component-outlined'
                            value={description}
                            label='Description'
                            onChange={(e: SyntheticEvent) => setDescription((e.target as HTMLInputElement).value)} />

                    </FormControl>
                    <br />
                    <FormControl>
                        <InputLabel htmlFor='component-outlined'>Price</InputLabel>
                        <OutlinedInput
                            id='component-outlined'
                            value={price}
                            label='Price'
                            onChange={(e: SyntheticEvent) => setPrice((e.target as HTMLInputElement).value)} />

                    </FormControl>
                    <br />
                    <FormControl>
                        <InputLabel htmlFor='component-outlined'>Small Image URL</InputLabel>
                        <OutlinedInput
                            id='component-outlined'
                            value={imageS}
                            label='Small Image URL'
                            onChange={(e: SyntheticEvent) => setImageS((e.target as HTMLInputElement).value)} />

                    </FormControl>
                    <br />
                    <FormControl>
                        <InputLabel htmlFor='component-outlined'>Medium Image </InputLabel>
                        <OutlinedInput
                            id='component-outlined'
                            value={imageM}
                            label='Medium Image URL'
                            onChange={(e: SyntheticEvent) => setImageM((e.target as HTMLInputElement).value)} />

                    </FormControl>
                    <br />
                    {/* This is a drop down for category state */}
                    <Select
                        id='demo-simple-select-helper'
                        value={category}
                        label='Search'
                        onChange={event => setCategory(event.target.value as number)}>
                        <MenuItem value={0}>Category</MenuItem>
                        <MenuItem value={1}>Cloud</MenuItem>
                        <MenuItem value={2}>Dawn</MenuItem>
                        <MenuItem value={3}>Day</MenuItem>
                        <MenuItem value={4}>Dusk</MenuItem>
                        <MenuItem value={5}>Moon</MenuItem>
                        <MenuItem value={6}>Night</MenuItem>
                        <MenuItem value={7}>Space</MenuItem>
                        <MenuItem value={8}>Sun</MenuItem>
                    </Select>
                    {message ?
                        <h4>{message}</h4>
                        :
                        <><br /></>
                    }
                    <Button id='createButton' onClick={sendNewProduct} variant='contained'>Create</Button>

                </Box>
            </CreateDiv>
        </React.Fragment>
    );
};
