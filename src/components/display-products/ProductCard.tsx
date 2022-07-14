import {
    SearchOutlined,
    ShoppingCartOutlined,
  } from "@material-ui/icons";
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
  
  const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;
  
  const Image = styled.img`
    // height: 75%;
    width:100%;
    z-index: 2;
  `;
  
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
  

  interface productProps {
      product: Product,
      key: number
      setSelection(arg0: Product | undefined): void;
  }



  export const ProductCard = (props: productProps) => { // CODE STARTS HERE
    const { cart, setCart } = useContext(CartContext);



    const addItemToCart = (product: Product) => {

      const newCart = [...cart]
      const index = newCart.findIndex((searchProduct) => {
        return searchProduct.product_id === product.product_id
      })

      if (index === -1) newCart.push(product)
      // else newCart[index].quantity += product.quantity

      setCart(newCart)
    }

    return (
      // <div>

      // </div>
      <Container onClick={() => {props.setSelection(props.product)}} style={{backgroundColor:"rgba(8,26,62,0.8)"}}>
        {/* <Circle /> */}
        <Image src={props.product.image_url} style={{opacity:"1"}}/>
        <Info>
          <Icon>
            <ShoppingCartOutlined onClick={() => {addItemToCart({...props.product})}} />
          </Icon>
          <Icon>
            <SearchOutlined />
          </Icon>
        </Info>
      </Container>
      
    );
  };