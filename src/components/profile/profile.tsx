/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import ResetRquest from '../../models/ResetRequest';
import { apiResetPassword } from '../../remote/e-commerce-api/authService';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { currentUser, updateUser, UserState } from '../../store/userSlice';

/**
 * 
 * @returns {void}
 */
export default function Profile() {
    const user: UserState = useAppSelector(currentUser);
    const dispatch = useAppDispatch();

    const [message, setMessage] = useState<string>('');
    const [message2, setMessage2] = useState<string>('');


    /**
     * Checks if password is valid
     *
     * @param {string} value Password to be tested
     */
    const checkPassword = (value: string) => {
        const isContainsUppercase = /^(?=.*[A-Z]).*$/;
        if (!isContainsUppercase.test(value)) { // Test if string contains UpperCase character
            setMessage2('New Password must have at least one Uppercase Character.');
        }

        const isContainsLowercase = /^(?=.*[a-z]).*$/;
        if (!isContainsLowercase.test(value)) { // Test if string contains LowerCase character
            setMessage2('New Password must have at least one Lowercase Character.');
        }

        const isContainsNumber = /^(?=.*[0-9]).*$/;
        if (!isContainsNumber.test(value)) { // Test if string contains Number
            setMessage2('New Password must contain at least one Number.');
        }

        const isContainsSymbol = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
        if (!isContainsSymbol.test(value)) { // Test if string contains Special Character
            setMessage2('New Password must contain at least one Special Symbol.');
        }

        const isValidLength = /^.{8,}$/;
        if (!isValidLength.test(value)) { // Test if string is 8 characters long
            setMessage2('New Password must be atleast 8 Characters Long.');
        }
    };

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
        } else {

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
                if (error.response.status === 401) { // if status is 401 set message
                    setMessage('Current Password is incorrect');
                }
            }
        }
    };

    const resetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const newPassword = data.get('newPassword'); // creates local email variable from data
        const currentPassword = data.get('currentPassword'); // creates local password variable from data
        const passwordRegex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})');

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

        if (!passwordRegex.test(newPassword!.toString())) { // if new password fails test, run checkPassword()
            checkPassword(newPassword!.toString());
        } else {
            try {
                const response = await apiResetPassword(newUpdateUser, user.token);
                if (response.status >= 200 && response.status < 300) { // if status is good set message
                    setMessage2('Password Updated Successfully');
                    setTimeout(() => setMessage2(''), 2000);

                }
            } catch (error: any) {
                if (error.response.status === 401) { // if status is 401 set message
                    setMessage2('Current Password is incorrect');
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
            <Box>
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

                {message2 && <p>{message2}</p>}
                <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Reset Password
                </Button>
            </Box>

        </Container>
    );
}
