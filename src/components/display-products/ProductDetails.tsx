import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { CartContext } from '../../context/cart.context';
import Product from '../../models/Product';
import Rating from '../../models/RatingResponse';
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
                    {/* This is mapping through reviews to display each review */}
                    {reviews ? reviews.map((review) => <> 
                        <Review>
                        <h3>{"*".repeat((review.rating)?review.rating:1)}</h3>
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

