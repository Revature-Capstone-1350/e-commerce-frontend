import React, { SyntheticEvent, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button, MenuItem, Select} from '@mui/material';
import styled from 'styled-components';
import { apiCreateProduct } from '../../remote/e-commerce-api/productService';
import CreateProductRequest from '../../models/CreateProductRequest';

const CreateDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
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

    const sendNewProduct = async () => {
        if (!name || !description || !price || !imageS || !imageM) { // If fields are empty, a message will display an error
            setMessage('All fields must be completed');
        } else if (category === 0) { // If category hasn't been selected, a message will display an error
            setMessage('Please select a category for this image');
        } else { // If all fields and category has been set, send the information to the API
            const productResponse: CreateProductRequest = {category: category,
            name: name,
            description: description,
            price: +price,
            imageUrlS: imageS,
            imageUrlM: imageM};
        const response = await apiCreateProduct(productResponse); // Sends login request to API
            if (Math.floor(response.status/100) !=2) { // If the response is not in the 200 range a error message will be displayed
                setMessage('Could not create a new product, please contact development team.');
            } else { // If the response is in the 200 range a confirmation message will be displayed
                setMessage('New Product Created');
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
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                >
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Name</InputLabel>
                    <OutlinedInput
                    id="component-outlined"
                    value={name}
                    label="Name"
                    onChange={(e: SyntheticEvent) => setName((e.target as HTMLInputElement).value)} />

                </FormControl>
                <br />
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Description</InputLabel>
                    <OutlinedInput
                    id="component-outlined"
                    value={description}
                    label="Description"
                    onChange={(e: SyntheticEvent) => setDescription((e.target as HTMLInputElement).value)} />

                </FormControl>
                <br />
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Price</InputLabel>
                    <OutlinedInput
                    id="component-outlined"
                    value={price}
                    label="Price"
                    onChange={(e: SyntheticEvent) => setPrice((e.target as HTMLInputElement).value)} />

                </FormControl>        
                <br/>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Small Image URL</InputLabel>
                    <OutlinedInput
                    id="component-outlined"
                    value={imageS}
                    label="Small Image URL"
                    onChange={(e: SyntheticEvent) => setImageS((e.target as HTMLInputElement).value)} />

                </FormControl>
                <br/>
                <FormControl>
                    <InputLabel htmlFor="component-outlined">Medium Image </InputLabel>
                    <OutlinedInput
                    id="component-outlined"
                    value={imageM}
                    label="Medium Image URL"
                    onChange={(e: SyntheticEvent) => setImageM((e.target as HTMLInputElement).value)} />

                </FormControl>
                <br />
        {/* This is a drop down for category state */}
        <Select
            id="demo-simple-select-helper"
            value={category}
            label="Search"
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
        <Button id="createButton" onClick={sendNewProduct} variant="contained">Create</Button>
        { message ?
            <h4>{message}</h4>
                :
            <><br/></>
                    }
         </Box>
        </CreateDiv>
</React.Fragment>
);
};
