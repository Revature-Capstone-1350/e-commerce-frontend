/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ResetRquest from '../../models/ResetRequest';
import { apiResetPassword } from '../../remote/e-commerce-api/authService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { currentUser, updateUser, UserState } from '../../store/userSlice';
import { checkPassword, CheckPasswordOutput } from '../../utils/checkPassword';

/**
 * 
 * @returns {void}
 */
export default function Profile() {
    const user: UserState = useAppSelector(currentUser);
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string>('');
    const [message2, setMessage2] = useState<string>('');
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const updateProfile = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        let firstName = data.get('newFirstName'); // creates local email variable from data
        let lastName = data.get('newLastName'); // creates local password variable from data
        let email = data.get('newEmail'); // creates local email variable from data
        const currentPassword = data.get('currentPassword'); // creates local password variable from data
        const emailRegex = /^\S+@\S+\.\S+$/;

        if (!email) {
            email = ''; // If email is empty set email to empty string
        }
        if (!firstName) {
            firstName = ''; // If first name is empty set email to empty string
        }
        if (!lastName) {
            lastName = ''; // If last name is empty set email to empty string
        }

        // create a new Reset Request object
        const newUpdateUser: ResetRquest = {
            newFirstname: firstName!.toString(),
            newLastname: lastName!.toString(),
            newEmail: email!.toString(),
            newPassword: '',
            oldPassword: currentPassword!.toString(),
        };


        if (email) { // if email is not empty and does not pass regex test update message
            if (!emailRegex.test(email!.toString())) {
                setMessage('Email is not valid');
            }
        }
        try {
            const response = await apiResetPassword(newUpdateUser, user.token);
            if (response.status >= 200 && response.status < 300) { // if status is good set message
                setMessage('Profile Updated Successfully');
                setTimeout(() => setMessage(''), 2000);


            }
            const newUserData = response.payload; // Gets user from response
            newUserData.token = response.headers.authorization; // Gets token from headers
            dispatch(updateUser(newUserData)); // sets user in redux store

        } catch (error: any) {
            if (error.response.status >= 400) { // if status is 401 set message
                setMessage('Current Password is incorrect');
            }
        }
    };

    const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newPassword = data.get('newPassword'); // creates local email variable from data
        const currentPassword = data.get('currentPassword'); // creates local password variable from data
        const passwordObject: CheckPasswordOutput = checkPassword(newPassword!.toString());

        // If email is empty set email to empty string
        const newUpdateUser: ResetRquest = {
            newFirstname: '',
            newLastname: '',
            newEmail: '',
            newPassword: newPassword!.toString(),
            oldPassword: currentPassword!.toString(),
        };

        if (!newPassword || !currentPassword) { // if both fields are empty set message
            setMessage2('Please fill out all fields');
        }

        if (!passwordObject.isValid) { // if new password fails test, run checkPassword()
            setPasswordErrors(passwordObject.errorMessages);
        } else {
            try {
                const response = await apiResetPassword(newUpdateUser, user.token);
                if (response.status >= 200 && response.status < 300) { // if status is good set message
                    setMessage2('Password Updated Successfully');
                    setTimeout(() => setMessage2(''), 2000);
                    setPasswordErrors([]);

                }
            } catch (error: any) {
                if (error.response.status >= 400) { // if status is 401 set message
                    setMessage2('Current Password is incorrect');
                    setPasswordErrors([]);
                }
            }
        }
    };

    if (user.id === 0) { // if user is not logged in navigate to login
        return (
            <Navigate to="/login" />
        );
    }
    return (
        <Container component='main' maxWidth='lg'>
            <CssBaseline />
            <Box className='profileHeader'>
                <h5>First Name: {user.firstName}</h5>
                <h5>Last Name: {user.lastName}</h5>
                <h5>Email: {user.email}</h5>
            </Box>
            <Box component='form' onSubmit={updateProfile}>
                <h2>Update Profile</h2>
                <TextField
                    className='textbox'
                    margin='normal'
                    fullWidth
                    name='newFirstName'
                    label='Update First Name'
                    type='text'
                    id='firstName'
                />
                <TextField
                    className='textbox'
                    margin='normal'
                    fullWidth
                    name='newLastName'
                    label='Update Last Name'
                    type='text'
                    id='lastName'
                />
                <TextField
                    className='textbox'
                    margin='normal'
                    fullWidth
                    id='newEmail'
                    label='Update Email Address'
                    name='newEmail'
                    autoComplete='off'
                />
                <TextField
                    className='textbox'
                    margin='normal'
                    required
                    fullWidth
                    name='currentPassword'
                    label='Current Password'
                    type='text'
                    id='currentPassword'
                    autoComplete='off'

                />

                {message && <p>{message}</p>}
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Update User
                </Button>
            </Box>
            <Box component='form' onSubmit={resetPassword}>
                <h2>Reset Password</h2>
                <TextField
                    className='textbox'
                    margin='normal'
                    required
                    fullWidth
                    name='currentPassword'
                    label='Current Password'
                    type='password'
                    id='currentPassword'
                    autoComplete='off'

                />
                <TextField
                    className='textbox'
                    margin='normal'
                    required
                    fullWidth
                    name='newPassword'
                    label='New Password'
                    type='password'
                    id='newPassword'
                    autoComplete='off'
                />

                <div>
                    {message2 && <p>{message2}</p>}
                    {passwordErrors && passwordErrors.map((errorMessage: string) => <p key={errorMessage}>{errorMessage}</p>)}

                </div>

                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Reset Password
                </Button>
            </Box>


        </Container>
    );
}