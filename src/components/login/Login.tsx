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
<<<<<<< HEAD
import { useEffect, useState } from 'react';
=======
import { useAppDispatch } from '../../store/hooks';
import { updateUser } from '../../store/userSlice';
>>>>>>> 2675cec6de1a7a6f648227e9ad327cfe63e531c4


/**
 * @returns {void}
 */
export default function Login() {
<<<<<<< HEAD
  const navigate = useNavigate();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(!email || regex.test(email) === false){
      setError("Email is not valid")
      
    }
    const data = new FormData(event.currentTarget);
    const response = await apiLogin(`${data.get('email')}`, `${data.get('password')}`);
    if (response.status >= 200 && response.status < 300) navigate('/')
  };

  //useeffect... console.log(9error)0, [error]}
  useEffect( () => {
    console.log(error)
  }, [error]);
  const handleEmail = (e : React.SyntheticEvent) => {
    setEmail((e.target as HTMLInputElement).value)
  };
  const handlePassword = (e : React.SyntheticEvent) => {
    setPassword((e.target as HTMLInputElement).value)
  };
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              value={email}
              onChange={handleEmail}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              value={password}
              onChange={handlePassword}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
=======
    // Navigate variable to useNavigate hook
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    /**
     * Handles login button click, sends login request to API
     *
     * @param {React.FormEvent<HTMLFormElement>}event event listener
     */
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents page from refreshing
        const data = new FormData(event.currentTarget); // Gets form data
        const response = await apiLogin(`${data.get('email')}`, `${data.get('password')}`); // Sends login request to API
        if (response.status >= 200 && response.status < 300)
            navigate('/'); // If login successful, navigate to home page
        const user = response.payload; // Gets user from response
        user.token = response.headers.authorization; // Gets token from headers
        dispatch(updateUser(user)); // sets user in redux store
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
>>>>>>> 2675cec6de1a7a6f648227e9ad327cfe63e531c4
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
