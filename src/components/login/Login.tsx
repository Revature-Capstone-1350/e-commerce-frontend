/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { apiLogin } from '../../remote/e-commerce-api/authService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { updateUser } from '../../store/userSlice';


/**
 * @returns {void}
 */
export default function Login() {

  // Navigate variable to useNavigate hook
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('');

  /**
   * Checks if password is valid
   *
   * @param {string} value Password to be tested
   */
  const checkPassword = (value: string) => {
    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) { // Test if string contains UpperCase character
      setError('Password must have at least one Uppercase Character.');
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) { // Test if string contains LowerCase character
      setError('Password must have at least one Lowercase Character.');
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) { // Test if string contains Number
      setError('Password must contain at least one Number.');
    }

    const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
    if (!isContainsSymbol.test(value)) { // Test if string contains Special Character
      setError('Password must contain at least one Special Symbol.');
    }

    const isValidLength = /^.{8,}$/;
    if (!isValidLength.test(value)) { // Test if string is 8 characters long
      setError('Password must be atleast 8 Characters Long.');
    }
  };

  /**
   * Handles login button click, sends login request to API
   *
   * @param {React.FormEvent<HTMLFormElement>}event event listener
   */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents page from refreshing
    const data = new FormData(event.currentTarget); // Gets form data
    const email = data.get('email'); // creates local email variable from data
    const password = data.get('password'); // creates local password variable from data
    // regex for input validation of email and password.
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

    if (!data.get('email') || !data.get('password')) {
      setError('Please enter email and password.'); // if email and password is null, set error message.
    }
    else if (!regex.test(email!.toString()!)) {
      setError('Enter valid email'); // if email fails regex test, set error message.
    } else if (!strongRegex.test(password!.toString()!)) {
      checkPassword(password!.toString()); // if password fails regex test, run checkPassword function.
    } else {
      try {
        const response = await apiLogin(`${data.get('email')}`, `${data.get('password')}`); // Sends login request to API
        if (response.status >= 200 && response.status < 300) {
          navigate('/'); // If login successful, navigate to home page
        }
        const user = response.payload; // Gets user from response
        user.token = response.headers.authorization; // Gets token from headers
        dispatch(updateUser(user)); // sets user in redux store 
      } catch (error: any) {
        if (error.response.status === 401) {
          setError('Invalid Creditials: Cannot find User!'); //  if status is 401, set error message.
        }
      }
    }

  };

  return (
    <Container className='login-container' component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign in
        </Typography>
        {/* Login form */}
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            className='textbox'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            autoFocus
          />
          <TextField
            className='textbox'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
          />
          {error && <p>{error}</p>}
          <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              {/* Link to register page */}
              <Link href='register' variant='body2'>
                {'You do not have an account? Sign Up'}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
