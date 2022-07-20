import { SyntheticEvent, useState } from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { Button} from "@mui/material";
import axios from "axios";

function CreateProducts() {
    // initializing state
    const [name, setName] = useState<string>('')
    
    const [price, setPrice] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [image, setImage] = useState<string>('')
    const sendNewProduct = async () => {

    // using axios to send JSON when button is clicked for new product details
    const res = await axios.post('/createproduct', {
        createQuantity: quantity,
        createPrice: price,
        createDescription: description,
        createImage: image,
        createName: name
    },
    // setting content type to json
    { headers: { 'content-type': 'application/json'} });
    
}
return (
    //we need redux store information
//!props.currentAdmin
    <>
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
            <InputLabel htmlFor="component-outlined">Quantity</InputLabel>
            <OutlinedInput
            id="component-outlined"
            value={quantity}
            label="Quantity"
            onChange={(e: SyntheticEvent) => setQuantity((e.target as HTMLInputElement).value)} />

        </FormControl>
        <br/>
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
            <InputLabel htmlFor="component-outlined">Description</InputLabel>
            <OutlinedInput
            id="component-outlined"
            value={description}
            label="Description"
            onChange={(e: SyntheticEvent) => setDescription((e.target as HTMLInputElement).value)} />

        </FormControl>
        <br/>
        <FormControl>
            <InputLabel htmlFor="component-outlined">Image</InputLabel>
            <OutlinedInput
            id="component-outlined"
            value={image}
            label="Image"
            onChange={(e: SyntheticEvent) => setImage((e.target as HTMLInputElement).value)} />

        </FormControl>
        
        <Button id="createButton" onClick={sendNewProduct} variant="contained">Create</Button>
        
        </Box>
</>
)}

export default CreateProducts;