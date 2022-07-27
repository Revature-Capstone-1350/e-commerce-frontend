import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Box, Button } from '@mui/material';
import Address from '../../models/Address';
import '../../css/customMUI.css';
import { useState } from 'react';


interface IAddressProps {
    updateAddress: (addresses: Address) => void;
    handleNext: () => void;
}

/**
 * Handles submission of addresses.
 * 
 * @returns {void}
 * @param {IAddressProps} props Address properties
 */
export default function AddressForm(props: IAddressProps) {
    const [error, setError] = useState<string>('');


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        props.updateAddress({
            firstName: `${data.get('firstName')}`,
            lastName: `${data.get('lastName')}`,
            street: `${data.get('street')}`,
            street2: `${data.get('street2')}`,
            city: `${data.get('city')}`,
            state: `${data.get('state')}`,
            zip: `${data.get('zip')}`,
            country: `${data.get('country')}`,
        });
        if (
            data.get('firstName') && 
            data.get('lastName') &&
            data.get('street') &&
            data.get('city') &&
            (''+data.get('city')).length <= 50 &&
            data.get('state') &&
            (''+data.get('state')).length === 2 &&
            data.get('zip') &&
            (''+data.get('zip')).length <= 10 
            ) {
                props.handleNext();
            }
            else {
                setError('Please enter a valid address');
            }
    };

    return (
        <React.Fragment>
            <Typography variant='h6' gutterBottom>
                Shipping address
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            style={{ zIndex: 1 }}
                            required
                            id='firstName'
                            name='firstName'
                            label='First name'
                            fullWidth
                            autoComplete='given-name'
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id='lastName'
                            name='lastName'
                            label='Last name'
                            fullWidth
                            autoComplete='family-name'
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id='street'
                            name='street'
                            label='Address line 1'
                            fullWidth
                            autoComplete='shipping address-line1'
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id='street2'
                            name='street2'
                            label='Address line 2'
                            fullWidth
                            autoComplete='shipping address-line2'
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id='city'
                            name='city'
                            label='City'
                            fullWidth
                            autoComplete='shipping address-level2'
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id='state'
                            name='state'
                            label='State/Province/Region Code *'
                            fullWidth
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id='zip'
                            name='zip'
                            label='Zip / Postal code'
                            fullWidth
                            autoComplete='shipping postal-code'
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            required
                            id='country'
                            name='country'
                            label='Country'
                            fullWidth
                            autoComplete='shipping country'
                            variant='standard'
                        />
                    </Grid>
                </Grid>
                {error && <p style={{position:'absolute'}}>{error}</p>}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button type='submit' variant='contained' sx={{ mt: 3, ml: 1 }}>
                        Next
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    );
}
