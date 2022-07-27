import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../../context/cart.context';
import Product from '../../models/Product';

// Info Styling Component
const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`;

// Container Styling Componenet
const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255,255,240,0.3);
    position: relative;
    &:hover ${Info} {
        opacity: 1;
    }
`;

// Circle Styling Component
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`;

// Image Styling Component
const Image = styled.img`
    max-width: 100%;
    height: 75%;
    z-index: 2;
`;

// Icon Styling Component
const Icon = styled.div`
    color: black !important;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
    }
`;

const styles = {
  icon: {
    fill: 'black !important',
  },
};

// Props for ProductCard
interface productProps {
  product: Product;
  key: number;
}

export const ProductCard = (props: productProps) => {
  // Context for Cart
  const { cart, setCart } = useContext(CartContext);

  // Navigate variable to useNavigate
  const navigate = useNavigate();

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
    <Container>
      <Circle />
      <Image src={props.product.imgUrlSmall} />
      <Info>
        <Icon 
          id={`put-in-cart-item-${props.product.productId}`}
          className='put-in-cart-btn'
          onClick={() => { addItemToCart({ ...props.product }); }}
        >
          {/* Icon for adding product to cart */}
          <ShoppingCartOutlined
            style={{ ...styles.icon }}

          />
        </Icon>
        <Icon 
          id={`detail-product-${props.product.productId}`}
          className='detail-product-btn'
          onClick={() => navigate(`/${props.product.productId}`)}
        >
          <SearchOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

