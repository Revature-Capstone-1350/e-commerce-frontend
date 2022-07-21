import { Box, TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect, useContext, SyntheticEvent } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../../context/cart.context';
import Product from '../../models/Product';
import Rating from '../../models/RatingResponse';
import eCommerceClient from '../../remote/e-commerce-api/eCommerceClient';
import { apiGetProductById, apiGetReviewByProductId } from '../../remote/e-commerce-api/productService';
import { useAppSelector } from '../../store/hooks';
import { currentUser } from '../../store/userSlice';

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Flex = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;

const Image = styled.img`
    width: 650px;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: left;
    height: 100%;
    padding: 0px 20px;
    flex: 1;
    margin: 0px 20px;
    border-radius: 10px;
    background-color: #eee;
    box-shadow: 0 1px 2px 1px #00000026;
    `;

const ProductInfoBottom = styled.div`
    width: 100%;
    paddding: 0px 20px;
`;

const AddToCart = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    margin: 10px 0px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
        background-color: #0a71bb;
        }
    `;

const ProductReviews = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 20px;
    width: 100%;
`;

const Review = styled.div`
    border: 1px solid;
    padding: 0px 10px;
    margin-top: 10px;
    border-radius: 10px;
    box-shadow: 0 1px 2px 1px #00000026;
`;

const ProductDetail = () => {
    // Context for Cart
    const { cart, setCart } = useContext(CartContext);

    // Initialize States
    const [product, setProduct] = useState<Product>({
        productId: 0,
        name: '',
        description: '',
        price: 0,
        imgUrlSmall: '',
        imgUrlMed: '',
        category: '',

    });
    const [reviews, setReviews] = useState<Rating[]>([]);
    const [display, setDisplay] = useState(false);

    const { id } = useParams();
    const user = useAppSelector(currentUser);
    console.log(user);
    useEffect(() => {
        // Fetch's product by Id and set state of current product
        const fetchData = async () => {
            const result = await apiGetProductById(id!);
            setProduct(result.payload);
            console.log(result.payload);
        };
        fetchData();

        const fetchReviews = async () => {
            const result = await apiGetReviewByProductId(id!); // ! means not null
            setReviews(result.payload);
            console.log(result.payload);
        };
        fetchReviews();

        // export const apiGetReviewByProductId = async (id: string): Promise<eCommerceApiResponse> => {
//     const response = await eCommerceClient.get<Rating>(`${baseURL}/rating/${id}`);
//     return { status: response.status, payload: response.data }; 
// };
    }, []);

    // useEffect

    /**
     * Adds product to cart.
     * If product is in cart, then it will add 1 to the quantity.
     * If product is not in cart, then it will add product to cart.
     *
     * @param {Product} product product to be added to cart
     */
    const addItemToCart = (product: Product) => {
        const newCart = [...cart]; // creates new cart list.
        const index = newCart.findIndex((searchProduct) => {
            return searchProduct.productId === product.productId; // checks if product is in cart.
        });

        if (index === -1)
            newCart.push(product); // if product is not in cart, then add product to cart.

        setCart(newCart); // sets cart to new cart list.
    };

    const addReview = (e:SyntheticEvent) => {
        console.log("clicked");
        setDisplay(true);

    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevents page from refreshing
        const data = new FormData(event.currentTarget); // Gets form data
        // let object:string  = {};
        // data.forEach((value,key) => object[key] = value);


        const token = "LYLlialoLs+dVZ0gmLRdjcyhrsTpeYhyi8MDwgd0I4UxroW+Xvdd2cu0NswtUVNxmJG9Vtap9Kqd6bVlalHGX7jWR9pu6moTT9qhsoqlkfP7TPSA8z4AoZV8jdKrTb1Ee9XUY7oX5twppfW5b9WxSQfv2Hh3RhYgpSJscdCXq+n8KYOH1kd7QP1ROiNKqHCSRxn6TMQNxCk1WXSW7eQV3Y+LKJtE+luv8k8t5hU+laTfrs/iqeTA/wQeY8WI0gob593UuzypXhXrVFbE6t6K62myIEWZgKL+Zv4fFotoGK+Ldq5z/zozPB3ck34yaY21VZCIR/sQSfwJh4SzmUXPZXY7jlaAm/qCwldqH2sq2Lje8HG9lbLLkhb+HlrvFsm1AYtTPq8VPUfXDMkKVjJOJTz5UApnZKp8Dh0rPE8KFoKcN3mHq1LdjJ4UU6qsS+gbTKAsg2b+XMwAbfWefcWr9/FoF7q3lSZF9o2AxP0eQe4PZg3H/3b+hQ5U2G5ZINq8wZZC99WFL51ViK99hWMc68AJeXoTtxZRK1ljX+CXSwECSCcGKW698O1IBTgCSiLPobRdv2flIFqokbmHOkNEGmAfJgYmde+ZIarbACVBAu4GC0aTGyBeWlgfZnvIYge503gwXgKXWD7F5RBtxqoLUVtb+ZilWfRTYfAKG/h5kBq3Gyma82pTfs1sowDhsyhP1adJYnYNX4KWAr/5oySkFr38EkoBK3OIU+95nQIvmUkrHtcChDhJ/QwHCxqKYnuqdvzC8uONivk2V2Exk/QQVskFTBZNXgbK6xIhRVjY0xcl0jCHfh+gmpRZPlSUxjsq4tpV1aCjv68U4beI/qcDTEGVT4s9fUr5Z4o3JgymL82K75KcU8iuGj3nedGpVMxmMWk3DmKx4+E1iFASZCqJaYFJwAnJO02eFHNbGWRZsfqcXOhi2UhH30PgMuVaGvdL+CtuK2z85iZzSUGQNcZnAMl9N7MoytzAb/eSaQTiBy8THiOkKusr6pKfkHzVMA76iVtppAX3WEsf3tyt1TYe9dQuCxdw5KzR6DwTeIDhpKisZWQmNLsDbH+h1QpavD8n8a7MTT9EiiffBzcDyqJfyQHy0v6ZTRfoxfPJedR79jSJt3wRHHfVB8cmOeFYKgMSK+rEHOPxGC+OM/ghQWDoqIHh8qk1knndOoXJ2ufB5CJUwW1cQvSZ/hx1rfhHN2O05gnvTVFd/TTpORNse7tkFp610xW5ujRzeEyyViNeiD3R0qSn4YnOxxYiL81M752xWnGQJYRrOQ6/dhlO2VhXxvgxrtL4G3fDwUJxdOOcz5Npch/tzKZKns+Lakx3MLB6FP2a22DUM9L2qniLxa71gg==";
        const rating = `${data.get('rating')}`;
        const description = `${data.get('description')}`;
        const config = {
            headers: {
                "Authorization": token,
            }
          };
          
          axios.post(
            "http://localhost:5000/skyview/api/product/rating/"+product.productId, 
            JSON.parse(JSON.stringify({rating:rating, description:description})), 
            config).then(); 
        
        // const response = await apiLogin(`${data.get('email')}`, `${data.get('password')}`); // Sends login request to API
        // if (response.status >= 200 && response.status < 300) 
        // navigate('/'); // If login successful, navigate to home page
        // dispatch(updateUser(response.payload)); // uses login repsonse details to set user state
        
      };

    return (
        <React.Fragment>
            <Container>
                <Flex>
                    <Image src={product.imgUrlMed} />
                    <ProductInfo className="productInfo">
                        <div>
                            <h1>{product.name.toUpperCase()}</h1>
                            <h5>Price: ${product.price}</h5>
                            <h5>Product Description: {product.description}</h5>
                        </div>
                        <ProductInfoBottom>
                            <h5>Category: {product.category}</h5>
                            <h5>Product Id: {product.productId}</h5>
                            <AddToCart onClick={() => {
                                addItemToCart({ ...product });
                            }}>
                                Add to Cart
                            </AddToCart>
                        </ProductInfoBottom>
                    </ProductInfo>
                </Flex>
                <ProductReviews>
                    
                    <h1>Product Reviews</h1>
                    { (user.id!=0 && display) ? 
                    <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            className='textbox'
                            margin='normal'
                            required
                            fullWidth
                            id='rating'
                            label='rating'
                            name='rating'
                            autoComplete='rating'
                            autoFocus
                        />
                        <TextField
                            className='textbox'
                            margin='normal'
                            required
                            fullWidth
                            name='description'
                            label='description'
                            type='description'
                            id='description'
                            autoComplete='current-description'
                        />
                        <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                            Submit review
                        </Button>
                    </Box>
                    : (user.id!=0 && !display) ? <h3 onClick={addReview}>Click here to add your own review</h3>
                    : <h3>You must login to leave a review</h3>
                    }
                    {/* This is mapping through reviews to display each review */}
                    {reviews ? reviews.map((review) => <> 
                        <Review>
                        <h3>{"☆".repeat((review.rating)?review.rating:1)}</h3>
                        <h5>{review.description}</h5>
                        <h6>- {review.reviewerName}</h6>
                        </Review>
                    </>) : <><h1>No reviews yet!</h1></>}
                </ProductReviews>
            </Container>
        </React.Fragment>
    );
};

export default ProductDetail;

