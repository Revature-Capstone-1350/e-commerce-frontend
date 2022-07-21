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
import { useEffect, useState } from 'react';


const theme = createTheme();

/**
 * @returns {void}
 */
export default function Register() {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError([]);
    event.preventDefault();
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    const strongRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

    const errors:string[] = [];

    if(!email || regex.test(email) === false){
      const emailBad = 'Email is not valid';
      if(!error.includes(emailBad)) {
        errors.push(emailBad);
        // setError([...error, email_bad]) // deconstructor assignment example
      } 
      
    }
    if(!password || strongRegex.test(password) === false){
      const pwdBad = 'Password is not valid';
      if(!error.includes(pwdBad)) {
        errors.push(pwdBad);
      } 
    }
    if(errors) {
      setError(errors);
    }

    const data = new FormData(event.currentTarget);
    const response = await apiRegister(`${data.get('firstName')}`, `${data.get('lastName')}`, `${data.get('email')}`, `${data.get('password')}`);
    if (response.status >= 200 && response.status < 300) navigate('/login');
  };
  useEffect( () => {
    
  }, [error]);
  const handleEmail = (e : React.SyntheticEvent) => {
    setError([]);
    setEmail((e.target as HTMLInputElement).value);
  };
  const handlePassword = (e : React.SyntheticEvent) => {
    setError([]);
    setPassword((e.target as HTMLInputElement).value);
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={email}
                  onChange={handleEmail}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  value={password}
                  onChange={handlePassword}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            {(error)?<>{error.map((item) => (
              <p key={item}>{item}</p>
            ))}</>:<></>}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
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
