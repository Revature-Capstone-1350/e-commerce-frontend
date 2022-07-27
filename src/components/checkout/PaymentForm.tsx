import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import PaymentDetail from '../../models/PaymentDetail';
import { Box, Button } from '@mui/material';
import { useState } from 'react';

interface paymentFormProps {
    handleBack: () => void;
    handleNext: () => void;
    updatePayment: (paymentDetail: PaymentDetail[]) => void;
}

/**
 * @returns {void}
 * @param {paymentFormProps} props props for payment form
 */
export default function PaymentForm(props: paymentFormProps) {
    const [error, setError] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        props.updatePayment([
            { name: 'Card Type', detail: `Visa` },
            { name: 'Card Holder', detail: `${data.get('cardName')}` },
            { name: 'Card Number', detail: formatCardNumber(`${data.get('cardNumber')}`) },
            { name: 'Expiry Date', detail: `${data.get('expDate')}` },
        ]);
        if (
            data.get('cardName') &&
            data.get('cardNumber') &&
            data.get('expDate')
        ) {
            props.handleNext();
        }
        else {
            setError('Please enter valid card details');
        }
        
    };

    const formatCardNumber = (cardNumber: string) => {
        return `xxxx-xxxx-xxxx-${cardNumber.slice(-4)}`;
    };

    return (
        <React.Fragment>
            <Typography variant='h6' gutterBottom>
                Payment method
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id='cardName'
                            name='cardName'
                            label='Name on card'
                            fullWidth
                            autoComplete='cc-name'
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id='cardNumber'
                            name='cardNumber'
                            label='Card number'
                            fullWidth
                            autoComplete='cc-number'
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id='expDate'
                            name='expDate'
                            label='Expiry date'
                            fullWidth
                            autoComplete='cc-exp'
                            variant='standard'
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TextField
                            required
                            id='cvv'
                            name='cvv'
                            label='CVV'
                            helperText='Last three digits on signature strip'
                            fullWidth
                            autoComplete='cc-csc'
                            variant='standard'
                        />
                    </Grid>
                </Grid>
                {error && <p style={{position:'absolute'}}>{error}</p>}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                    </Button>
                    <Button type='submit' variant='contained' sx={{ mt: 3, ml: 1 }}>
                        Next
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    );
}
