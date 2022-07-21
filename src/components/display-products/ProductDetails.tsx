import { MenuItem, Select } from '@mui/material';
import React, { useState, useEffect, useContext, SyntheticEvent } from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { CartContext } from '../../context/cart.context';
import Product from '../../models/Product';
import UpdateProductRequest from '../../models/UpdateProduct';
import { apiGetProductById, apiUpdateProduct } from '../../remote/e-commerce-api/productService';
import { useAppSelector } from '../../store/hooks';
import { currentUser, UserState } from '../../store/userSlice';
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

const UpdateProduct = styled.button`
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
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [category, setCategory] = useState<number>(0);
    const [message, setMessage] = useState<string>('');

    const { id } = useParams();
    // Grabing the current user from state
    const user: UserState = useAppSelector(currentUser);
    useEffect(() => {
        // Fetch's product by Id and set state of current product
        const fetchData = async () => {
            const result = await apiGetProductById(id!);
            setProduct(result.payload);
        };
        fetchData();
    }, []);

    useEffect(() => { // if fields empty set default information
        if (!name || !price || !description) { 
            setMessage('ribbit, fields are empty');
            setName(product.name);
            setPrice((product.price).toString());
            setDescription(product.description);
            console.log(message);
        }
    });

    /**
     * update product funtion
     */
    const updateProduct = async () => {     
        // create a product request object
        const productResponse: UpdateProductRequest = {category: category,
            id: +id!,
            name: name,
            description: description,
            price: +price,
            imageUrlS: product.imgUrlSmall,
            imageUrlM: product.imgUrlMed};

        if (!name || !price || !description || category == 0) { // checks if fields are empty
            console.log('Ribbit');
        } else {
            const response = await apiUpdateProduct(productResponse); // Sends login request to API
            if (response.status >= 200 && response.status < 300) {
                setMessage('update successful');
            }
        }
                
    };

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
                    {/* checking to see if a user is an ADMIN. if they are then render input tags to allow them to edit and update the product. Else we render h tags instead. */}
                    { user.role === 'ADMIN'? <ProductInfo className="productInfo">
                        <div>
                            <label>Name:</label>
                            <input onChange={(e: SyntheticEvent) => setName((e.target as HTMLInputElement).value)} 
                                placeholder={product.name.toUpperCase()} defaultValue={name}></input>
                            <label>Price:</label>
                            <input onChange={(e: SyntheticEvent) => setPrice((e.target as HTMLInputElement).value)} 
                                placeholder={product.price.toString()} defaultValue={price.toString()}></input>
                            <label>Product Description:</label>
                            <input onChange={(e: SyntheticEvent) => setDescription((e.target as HTMLInputElement).value)} 
                                placeholder={product.description} defaultValue={description} ></input>
                            <Select
                                id="demo-simple-select-helper"
                                value={category}
                                label="Search"
                                onChange={event => setCategory(event.target.value as number)}>
                                <MenuItem value={0}>Category</MenuItem>
                                <MenuItem value={1}>Cloud</MenuItem>
                                <MenuItem value={2}>Dawn</MenuItem>
                                <MenuItem value={3}>Day</MenuItem>
                                <MenuItem value={4}>Dusk</MenuItem>
                                <MenuItem value={5}>Moon</MenuItem>
                                <MenuItem value={6}>Cloud</MenuItem>
                            </Select>
                        </div>
                        <ProductInfoBottom>
                            <UpdateProduct onClick={updateProduct}>
                                Update Product
                            </UpdateProduct>
                        </ProductInfoBottom>
                    </ProductInfo>
                    :
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
                    </ProductInfo>}
                </Flex>
                <ProductReviews>
                    <h1>Product Reviews</h1>
                    <Review>
                        <h3>*****</h3>
                        <h5>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum turpis sed hendrerit gravida. Fusce id neque non purus pulvinar tempor at a orci. Fusce imperdiet, magna quis interdum auctor, dui augue scelerisque turpis, ac hendrerit augue nibh non dolor. Nullam mattis nibh sit amet magna efficitur tristique. Sed consectetur massa at nibh suscipit suscipit. Nullam et accumsan risus, nec aliquet libero. Fusce efficitur leo justo, in vestibulum metus faucibus ultrices. Cras mollis rutrum pharetra.</h5>
                        <h6>- John Doe</h6>
                    </Review>
                    <Review>
                        <h3>***</h3>
                        <h5>Smaller Example</h5>
                        <h6>- John Doe</h6>
                    </Review>

                </ProductReviews>
            </Container>
        </React.Fragment>
    );
};

export default ProductDetail;

