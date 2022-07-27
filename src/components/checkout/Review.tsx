import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import PaymentDetail from '../../models/PaymentDetail';
import Address from '../../models/Address';
import { Box, Button } from '@mui/material';
import { apiPurchase } from '../../remote/e-commerce-api/productService';
import { CartContext } from '../../context/cart.context';
import Order from '../../models/Order';
import { useAppSelector } from '../../store/hooks';
import { UserState, currentUser } from '../../store/userSlice';

interface reviewProps {
  handleBack: () => void;
  handleNext: () => void;
  address: Address;
  payments: PaymentDetail[];
}

/**
 * @returns {void}
 * @param {reviewProps} props props for review
 */
export default function Review(props: reviewProps) {
  const { cart, setCart } = React.useContext(CartContext);

  const user: UserState = useAppSelector(currentUser);

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();

    const order = new Order(0,0,props.address,cart,'');
    apiPurchase(order, user.token);
    setCart([]);
    props.handleNext();
  };

  return (
    <React.Fragment>
      <Typography variant='h6' gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {cart.map((product) => (
          <ListItem key={product.name} sx={{ py: 1, px: 0 }}>
            <ListItemText
              primary={product.name}
              secondary={product.description}
            />
            <Typography variant='body2'>{product.price}</Typography>
          </ListItem>
        ))}
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary='Total' />
          <Typography variant='subtitle1' sx={{ fontWeight: 700 }}>
            ${' '}
            {cart.reduce<number>(
              (total, product) => total + product.price,
              0,
            )}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography
            gutterBottom
          >{`${props.address.firstName} ${props.address.lastName}`}</Typography>
          <Typography gutterBottom>{`${props.address.street}${props.address.street2 ? ', ' + props.address.street2 : ''
            }, ${props.address.city}, ${props.address.state} , ${props.address.zip}, ${props.address.country
            }`}</Typography>
        </Grid>
        <Grid item container direction='column' xs={12} sm={6}>
          <Typography variant='h6' gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
            {props.payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={props.handleBack} sx={{ mt: 3, ml: 1 }}>
          Back
        </Button>
        <Button variant='contained' onClick={handleSubmit} sx={{ mt: 3, ml: 1 }}>
          Place order
        </Button>
      </Box>
    </React.Fragment >
  );
}
