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
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { apiRegister } from '../../remote/e-commerce-api/authService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { CheckPasswordOutput, checkPassword } from '../../utils/checkPassword';


const theme = createTheme();

/**
 * @returns {void}
 */
export default function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = data.get('firstName'); // creates local email variable from data
    const lastName = data.get('lastName'); // creates local password variable from data
    const email = data.get('email'); // creates local email variable from data
    const password = data.get('password'); // creates local password variable from data
    const emailRegex = /^\S+@\S+\.\S+$/;
    const passwordObject: CheckPasswordOutput = checkPassword(password!.toString());


    if (!firstName || !lastName || !email || !password) {
      setError('Please fill out all fields');
    } else if (!emailRegex.test(email!.toString()!)) {
      setError('Enter valid email'); // if email fails regex test, set error message.
      console.log('not valid email');
      console.log(email!.toString()!);
    } else if (!passwordObject.isValid) { // if new password fails test, run checkPassword()
      setError('');
      setPasswordErrors(passwordObject.errorMessages);
    } else {
      try {
        const response = await apiRegister(`${data.get('firstName')}`, `${data.get('lastName')}`, `${data.get('email')}`, `${data.get('password')}`);
        if (response.status >= 200 && response.status < 300) navigate('/login');
      } catch (error: any) {
        if (error.response.status === 409) {
          setPasswordErrors([]);
          setError('There is already a User with that Email.');
        }
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
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
            Sign up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='family-name'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                />
              </Grid>
            </Grid>
            {error && <p>{error}</p>}
            {passwordErrors && passwordErrors.map((error: string) => <p key={error}>{error}</p>)}
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='login' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
