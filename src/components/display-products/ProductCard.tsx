
// import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
// import { useContext } from "react";
// import styled from "styled-components";
// import { CartContext } from "../../context/cart.context";
// import Product from "../../models/Product";

// //Info Styling Component
// const Info = styled.div`
//     opacity: 0;
//     width: 100%;
//     height: 100%;
//     position: absolute;
//     top: 0;
//     left: 0;
//     background-color: rgba(0, 0, 0, 0.2);
//     z-index: 3;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     transition: all 0.5s ease;
//     cursor: pointer;
//   `;

// //Container Styling Componenet
// const Container = styled.div`
//     flex: 1;
//     margin: 5px;
//     min-width: 280px;
//     height: 350px;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background-color: #f5fbfd;
//     position: relative;
//     &:hover ${Info}{
//       opacity: 1;
//     }
//   `;

// //Circle Styling Component
// const Circle = styled.div`
//     width: 200px;
//     height: 200px;
//     border-radius: 50%;
//     background-color: white;
//     position: absolute;
//   `;

// //Image Styling Component
// const Image = styled.img`
//     max-width: 100%;
//     height: 75%;
//     z-index: 2;
//   `;

// //Icon Styling Component
// const Icon = styled.div`
//     color: black !important;
//     width: 40px;
//     height: 40px;
//     border-radius: 50%;
//     background-color: white;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     margin: 10px;
//     transition: all 0.5s ease;
//     &:hover {
//       background-color: #e9f5f5;
//       transform: scale(1.1);
//     }
//   `;

// const styles = {
//   icon: {
//     fill: "black !important"
//   }
// }

// //Props for ProductCard
// interface productProps {
//   product: Product,
//   key: number;
// }

// export const ProductCard = (props: productProps) => {
//   //Context for Cart
//   const { cart, setCart } = useContext(CartContext);

//   /**
//    * Adds product to cart.
//    * If product is in cart, then it will add 1 to the quantity.
//    * If product is not in cart, then it will add product to cart.
//    * @param product product to be added to cart
//    */
//   const addItemToCart = (product: Product) => {
//     const newCart = [...cart]; // creates new cart list.
//     const index = newCart.findIndex((searchProduct) => {
//       return searchProduct.id === product.id; // checks if product is in cart.
//     });

//     if (index === -1) {

//       newCart.push(product); // if product is not in cart, then add product to cart.
      
//       //-----------//
//       console.log('index--  pushfrom index', index);
//       console.log('newcart--', newCart);
//       console.log('newcartLength--', newCart.length);
//       console.log('newcartLengthReduced--', newCart.reduce((total, product) => total +  product.quantity, 0));
//       console.log('cart--',cart)
//       console.log('cartLength--',cart.length)
//       console.log('cartLengthReduced--',cart.reduce((total, product) => total +  product.quantity, 0))
//     }
      
//     else {

//       newCart[index].quantity += product.quantity; // if product is in cart, then add 1 to quantity.
      
//       setCart(newCart);
//       //-----------//
//       console.log('index--  newcart addition', index);
//       console.log('newcart--', newCart);
//       console.log('newcartLength--', newCart.length);
//       console.log('newcartLengthReduced--', newCart.reduce((total, product) => total +  product.quantity, 0));
//       console.log('cart--',cart)
//       console.log('cartLength--',cart.length)
//       console.log('cartLengthReduced--',cart.reduce((total, product) => total +  product.quantity, 0)) // sets cart to new cart list.
//     }
//   }

//   return (
//     <Container>
//       <Circle />
//       <Image src={props.product.image} />
//       <Info>
//         <Icon>
//           {/* Icon for adding product to cart */}
//           <ShoppingCartOutlined style={{ ...styles.icon }} onClick={() => { addItemToCart({ ...props.product, quantity: 1 }) }} />
//         </Icon>
//         <Icon>
//           <SearchOutlined />
//         </Icon>
//       </Info>
//     </Container>
//   );
// };




//---------------------------------------------- //


import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "../../context/cart.context";
import Product from "../../models/Product";
import { selectCart, setCart } from "../../store/cartSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

//Info Styling Component
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

//Container Styling Componenet
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

//Circle Styling Component
const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
  `;

//Image Styling Component
const Image = styled.img`
    max-width: 100%;
    height: 75%;
    z-index: 2;
  `;

//Icon Styling Component
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
    fill: "black !important"
  }
}

//Props for ProductCard
interface productProps {
  product: Product,
  key: number;
}

export const ProductCard = (props: productProps) => {

  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCart)

console.log(cart);

  return (
    <Container>
      <Circle />
      <Image src={props.product.image} />
      <Info>
        <Icon>
          {/* Icon for adding product to cart */}
          <ShoppingCartOutlined style={{ ...styles.icon }} onClick={() => {  dispatch(setCart( {...props.product, quantity: 1 })) }} />
        </Icon>
        <Icon>
          <SearchOutlined />
        </Icon>
      </Info>
    </Container>
  );
};

 // set the quantity to 1  then send the new data to state