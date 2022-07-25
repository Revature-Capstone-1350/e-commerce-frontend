import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import Address from '../../models/Address';
import PaymentDetail from '../../models/PaymentDetail';

const steps = ['Shipping address', 'Payment details', 'Review your order'];

let address = {
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
};
let paymentDetail = [
    { name: 'Card type', detail: '' },
    { name: 'Card holder', detail: '' },
    { name: 'Card number', detail: '' },
    { name: 'Expiry date', detail: '' },
];

const theme = createTheme();

/**
 * @returns {void}
 */
export default function Checkout() {
    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const updateAddress = (newAddress: Address) => {
        address = newAddress;
    };

    const updatePayment = (newPaymentDetail: PaymentDetail[]) => {
        paymentDetail = newPaymentDetail;
    };

    /**
     * @returns {void} 
     * @param {number} step current case number
     */
    function getStepContent(step: number) {
        switch (step) {
            case 0:
                return <AddressForm handleNext={handleNext} updateAddress={updateAddress} />;
            case 1:
                return (
                    <PaymentForm
                        handleNext={handleNext}
                        handleBack={handleBack}
                        updatePayment={updatePayment}
                    />
                );
            case 2:
                return (
                    <Review
                        handleNext={handleNext}
                        handleBack={handleBack}
                        payments={paymentDetail}
                        address={address}
                    />
                );
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar
                position='absolute'
                color='default'
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            ></AppBar>
            <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
                <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
                style={{backgroundColor:'rgba(255,255,240,0.5)'}}
                >
                    <Typography component='h1' variant='h4' align='center'>
                        Checkout
                    </Typography>
                    <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    <React.Fragment>
                        {activeStep === steps.length ? (
                            <React.Fragment>
                                <Typography variant='h5' gutterBottom>
                                    Thank you for your order.
                                </Typography>
                                <Typography variant='subtitle1'>
                                    Your order number is #2001539. We have emailed your order
                                    confirmation, and will send you an update when your order has
                                    shipped.
                                </Typography>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>{getStepContent(activeStep)}</React.Fragment>
                        )}
                    </React.Fragment>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
