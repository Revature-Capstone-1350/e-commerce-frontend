
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";

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

// Styling component
const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfd;
  position: relative;
  &:hover ${Info}{
    opacity: 1;
  }
`;

// Styling component; currently unused
const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

// Styling component
const Image = styled.img`
  // height: 75%;
  width:100%;
  z-index: 2;
`;

// Styling component
const Icon = styled.div`
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

//Props for ProductCard
interface productProps {
    product: Product,
    key: number
    setSelection(arg0: Product | undefined): void; // passes state up to parent component
}



export const ProductCard = (props: productProps) => { // CODE STARTS HERE
  const { cart, setCart } = useContext(CartContext);



  const addItemToCart = (product: Product) => {

    const newCart = [...cart]
    const index = newCart.findIndex((searchProduct) => {
      return searchProduct.productId === product.productId
    })

    if (index === -1) newCart.push(product)
    // else newCart[index].quantity += product.quantity

    setCart(newCart)
  }

  return (
    // On click, tells the parent component to display a larger version of selected image
    <Container 
      onClick={() => {props.setSelection(props.product)}} 
      style={{backgroundColor:"rgba(150,150,135,0.3)"}}> {/* Ivory color, 80% visible */}
      {/* <Circle /> */}
      <Image src={props.product.imgUrlSmall}/>
      <Info>
        <Icon>
          {/* Icon for adding product to cart */}
          <ShoppingCartOutlined style={{ ...styles.icon }} onClick={() => { addItemToCart({ ...props.product, quantity: 1 }) }} />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
      </Info>
    </Container>
    
  );
};