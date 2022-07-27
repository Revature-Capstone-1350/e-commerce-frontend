import { ShoppingCartOutlined } from '@mui/icons-material';
import { Badge } from '@mui/material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../../context/cart.context';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { currentUser, updateUser, UserState } from '../../store/userSlice';
import DarkMode from '../darkmode/DarkMode';

// Container Styling Componenet
const Container = styled.div`
    box-shadow: 0 1px 2px 1px #00000026;
`;

// Wrapper Styling Component
const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

// Left Styling Component
const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`;

// Logo Styling Component
const Logo = styled.h1`
    font-weight: bold;
`;

// Right Styling Component
const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

// MenuItem Styling Component
const MenuItem = styled.div`
    font-size: 14px;
    cursor: pointer;
    margin-left: 25px;
`;

const Navbar = () => {
    // Navigate variable to useNavigate function.
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Retrieves user from redux
    const user: UserState = useAppSelector(currentUser);

    const { cart } = useContext(CartContext);
    const cartLength = cart.length;

    const logout = function () {
        dispatch(updateUser({
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            role: '',
            token: '',
          }));
          navigate('/login');
    };

    return (
        <Container>
            <Wrapper>
                <Left>
                    {/* Left Side of Navbar*/}
                    <Logo
                        id='logo' 
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        SkyView
                    </Logo>
                </Left>
                <Right>
                    {/* Right Side of Navbar*/}
                    <DarkMode />
                    {/* Navbar Rendering for Guest/Not Logged in*/}
                    {user.id === 0 &&
                        <>
                            <MenuItem 
                                id='register-btn' 
                                onClick={() => { navigate('/register'); }}
                            > REGISTER </MenuItem>
                            <MenuItem 
                                id='login-btn' 
                                onClick={() => { navigate('/login'); }}
                            >SIGN IN</MenuItem>
                        </>
                    }
                    {/* Navbar Rendering for Admins*/}
                    {user.role === 'ADMIN' &&
                        <>
                            <MenuItem 
                                id='create-product-btn' 
                                onClick={() => { navigate('/createproduct'); }}
                            >CREATE PRODUCT</MenuItem>
                            <MenuItem 
                                id='logout-btn' 
                                onClick={() => { logout(); }}
                            >LOGOUT</MenuItem>
                        </>
                    }
                    {/* Navbar Rendering for Basic Users*/}
                    {user.id !== 0 && user.role !== 'ADMIN' &&
                        <>
                            <MenuItem 
                                id='profile-btn'
                                onClick={() => { navigate('/profile'); }}
                            >PROFILE</MenuItem>
                            <MenuItem 
                                id='logout-btn' 
                                onClick={() => { logout(); }}
                            >LOGOUT</MenuItem>
                        </>
                    }
                    <MenuItem
                        id='view-cart-btn' 
                        onClick={() => {
                            navigate('/cart');
                        }}
                    >
                        <Badge color='primary' badgeContent={cartLength} max={999} showZero>
                            <ShoppingCartOutlined />
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    );
};

export default Navbar;
