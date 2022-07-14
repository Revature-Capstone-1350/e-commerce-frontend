import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
import { ProductCard } from "./ProductCard";
import Draggable from "react-draggable";


const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

interface IProduct {
  product_id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  image_url: string
}

const api_base = 'https://raw.githubusercontent.com/jsparks9/pics/main/get/';
let get_paths = ['products'];
const api_ex = '.JSON';

const img_base = "https://raw.githubusercontent.com/jsparks9/pics/main/images/";
const img_ex = ".jpg";
// for use with ID like img_base + product_id + img_ex

let has_init = false;

export const DisplayProducts = () => {

  const [products, setProducts] = useState<IProduct[]>([])
  const [selection, setSelection] = useState<IProduct | undefined>();

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await apiGetAllProducts()
  //     setProducts(result.payload)
  //   }
  //   fetchData()
  // }, [])

  const startUp = (async () => {
    let resp = await fetch(api_base+get_paths[0]+api_ex);
    if (Math.floor(resp.status/100) === 2) { // 200 expected
      let data = await resp.json();
      console.log("Got data, calling mapProducts");
      setProducts(await data as unknown as IProduct[]);
    } else {
      console.log("fetch failed with code "+resp.status);
    }
  });

  // function mapProducts(data:IProduct[]) {
  //   // map in a grid
  //   // this is JSX

  // };

  useEffect( () => {
    if (!has_init) {
      has_init = true;
      startUp();
    }
    
  }, []);

  function popout(prod:Product) {
    //props.product.product_id
    console.log("running popup for " + prod.product_id);
  }//onClick={popout(props.product)}

  return (
    <div style = {{ 
      backgroundImage:`url("https://www.pixelstalk.net/wp-content/uploads/2016/06/Best-Images-Night-Sky.jpg")`,
      // backgroundImage: `url("https://via.placeholder.com/500")`,
    }}>
      {(selection) ? 
      <>
        <div onClick={()=> {setSelection(undefined)}}>
          <div
            style = {{ 
              position:'fixed',
              backgroundImage:`url("C://Users//Name//Desktop//P3//e-commerce-frontend//night.jpg")`,
              //`url("https://via.placeholder.com/500")`
              height:"100%", width:"100%"
            }}>
          </div>
          {/* <div 
            style = {{ 
              position:'fixed', fontSize:50, zIndex:10, 
              height:"80%", width:"80%", 
              backgroundColor: "ivory", opacity:0.8,
              marginLeft:"10%",
              marginRight:"10%",
              marginTop:"5%",
              marginBottom:"10%",
              boxSizing: "border-box"
            }}>
          </div> */}
          <div 
            style = {{
              position:'fixed', zIndex:11, 
              maxWidth:"70%", height:"90%"
            }} >
            <img 
              src={selection.image_url}
              style = {{ 
                fontSize:50, 
                maxWidth:"100%", maxHeight:"100%", 
                marginLeft:"5%",
                marginRight:"5%",
                marginTop:"5%",
                marginBottom:"5%",
                boxSizing: "border-box", opacity:"1",
                border: "20px solid rgba(255, 255, 240, 0.8)",
                borderRadius: '16px'
              }}>

                {/* <div 
                style = {{ 
                  fontSize:50, zIndex:17, 
                  height:"100px", width:"100px", 
                  backgroundColor: "red", opacity:0.8,
                  marginLeft:"10%",
                  marginRight:"10%",
                  marginTop:"5%",
                  marginBottom:"10%",
                  boxSizing: "border-box"
                }}>
              </div> */}
              </img>
              
          </div>
        
        
        </div><Draggable ><div style = {{ position:'fixed', zIndex:100, 
        width:"300px", height:"350px", opacity:"0.9",
        backgroundColor:"skyblue", padding:"10px", boxSizing: "border-box",
        marginLeft:"60%", marginTop:"10%", color:"white", fontWeight:"500",
        borderRadius: '16px', border:"2px solid ivory"
        }}>
          <p style={{textAlign:"center", fontWeight:700, fontSize:"1.2em"}}>Draggable Information Box</p>
          <p style={{textAlign:"center", fontWeight:500, fontSize:"1em"}}>(Click image to close)</p>
          <p>Product ID: {selection.product_id}</p>
          <p>Description: {selection.description}</p>
          <p>Product Name: {selection.name}</p>
          <p>Category: {selection.category}</p>
          <p>Price: $ {selection.price}</p>
          <p onClick={() => {console.log("added")}}>Add to Card</p> 
        </div>
          
          </Draggable></> : <></>}
      <React.Fragment>
          <Navbar/>
          <Container>
          {products.map((item) => (
              <> 
              <ProductCard product={item} key={item.product_id} setSelection={setSelection}/>
              
              </>
          ))}
          </Container>
      </React.Fragment>
    </div>
  );
};