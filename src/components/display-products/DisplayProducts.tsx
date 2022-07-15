import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Narbar';
import { ProductCard } from "./ProductCard";
import { CartContext } from "../../context/cart.context";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const SearchDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 30px;
`;

const SearchBar = styled.input`
    border: none;
    width: 30%;
    font-size: 30px;
    border-bottom: 1px solid;
    outline: none;
    padding: 10px 0px;
`;

const Text = styled.h1`
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    width: 100%;`

// mock API code start
const api_base = 'https://raw.githubusercontent.com/jsparks9/pics/main/get/';
let get_paths = ['products0'];
const api_ex = '.json';
let has_init = false;
// mock API code end


export const DisplayProducts = () => {

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filterBy, setFilterBy] = useState("name");
  const [category, setCategory] = useState("category");
  const [selection, setSelection] = useState<Product | undefined>();
  const { cart, setCart } = useContext(CartContext);

  let search = (e: SyntheticEvent) => {
    let value = (e.target as HTMLInputElement).value;

    if (!value) {
      setFilteredProducts(products);
    } else {
      let results = products.filter((product: Product) => {
        return product.name.toLowerCase().includes(value.toLowerCase());
      })
      setFilteredProducts(results);
    }

  }

  let categorySearch = () => {
    if (category === "category") {
      setFilteredProducts(products);
    } else {
      let results = products.filter((product: Product) => {
        return product.category.toLowerCase().includes(category.toLowerCase());
      })
      if (results.length === 0) {
        setFilteredProducts([]);
      } else {
        setFilteredProducts(results);
      }
    }
  }

  useEffect(() => {
    if (filterBy === "category") {
      categorySearch();
    }
  })

  // mock API code start
  useEffect( () => {
    if (!has_init) {
      has_init = true;
      startUp();
    }
  }, []);
  const startUp = (async () => {
    let resp = await fetch(api_base+get_paths[0]+api_ex);
    if (Math.floor(resp.status/100) === 2) { // 200 expected
      let data = await resp.json();
      console.log("Got data, calling mapProducts");
      setProducts(await data as unknown as Product[]);
    } else {
      console.log("fetch failed with code "+resp.status);
    }
  });
  useEffect( () => {
    setFilteredProducts(products);
  }, [products]);
  // mock API code end

  // // using in-built method
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await apiGetAllProducts();   
  //     setProducts(result.payload);  
  //     setFilteredProducts(result.payload);
  //   }
  //   fetchData()
  // }, [])
  // // end of using in-built method

  // from Product Card
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
    //
    <div>
      {(selection) ? 
        <>
          <div onClick={()=> {setSelection(undefined)}}>
            <div 
              style = {{
                position:'fixed', zIndex:11, 
                maxWidth:"70%", height:"90%"
              }} >
              <img 
                src={selection.image_url_m}
                style = {{  
                  maxWidth:"100%", maxHeight:"100%", 
                  marginLeft:"5%",
                  marginRight:"5%",
                  marginTop:"5%",
                  marginBottom:"5%",
                  boxSizing: "border-box", opacity:"1",
                  border: "20px solid rgba(255, 255, 240, 0.8)",
                  borderRadius: '16px'
                }}>
                </img>
                
            </div>
          
          
          </div>
          <Draggable >
            <div 
              style = {{ 
                position:'fixed', zIndex:100, 
                width:"300px", height:"360px", opacity:"0.9",
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
            <div style={{backgroundColor:"blue"}}>
            <ShoppingCartOutlined onClick={() => {addItemToCart({...selection})}} />
            </div>
          </div>
            
            </Draggable></> : <></>}
      <React.Fragment>
        <Navbar />
        <SearchDiv>
          {filterBy === "name" ? <SearchBar type='text' onChange={search} placeholder="Search" className='searchbar'></SearchBar> : null}
          {filterBy === "category" ?
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              label="Search"
              onChange={event => setCategory(event.target.value as string)}            >
              <MenuItem value="category">Category</MenuItem>

              <MenuItem value="Moon">Moons</MenuItem>
              <MenuItem value="Sun">Suns</MenuItem>
              <MenuItem value="Star">Stars</MenuItem>
            </Select> : null}
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={filterBy}
            label="Search"
            onChange={event => setFilterBy(event.target.value as string)}            >
            <MenuItem value="name">Search By Name</MenuItem>
            <MenuItem value="category">Search By Category</MenuItem>
          </Select>
        </SearchDiv>
        <Container>
          {filteredProducts.length <= 0 && <Text>No Products Found</Text>}
          {filteredProducts.length > 0 && filteredProducts.map((item) => (
            <ProductCard product={item} key={item.product_id} setSelection={setSelection}/>
            ))}
        </Container>
      </React.Fragment>
    </div>
  );
};