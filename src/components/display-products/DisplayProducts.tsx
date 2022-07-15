import { FormControl, Input, InputLabel, MenuItem, Select } from '@material-ui/core';
import React, { SyntheticEvent, useContext, useEffect, useState } from 'react';
import styled from "styled-components";
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import Navbar from '../navbar/Navbar';
import { ProductCard } from "./ProductCard";
import Draggable from "react-draggable";
import { CartContext } from '../../context/cart.context';

//Container Styling Component
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

//SearchDiv Styling Component
const SearchDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 30px;
`;

//SearchBar Styling Component
const SearchBar = styled.input`
    border: none;
    width: 30%;
    font-size: 30px;
    border-bottom: 1px solid;
    outline: none;
    padding: 10px 0px;
`;

//H1 Styling Component
const Text = styled.h1`
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    width: 100%;`

// Start of mock data path
const apiBase = 'https://raw.githubusercontent.com/jsparks9/pics/main/get/';
let getPaths = ['products0'];
const apiEx = '.json';
const mockDataPath = apiBase+getPaths[0]+apiEx;
// end of mock data path

let hasGottenMockData = false; // ensures initial fetch request runs only once

const categories:string[] = ['Cloud','Dawn','Day','Dusk','Moon','Night','Space','Sun'];
// default categories of products; may be changed later to fetch from API

export const DisplayProducts = () => {

  //State initalizers
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filterBy, setFilterBy] = useState("name");
  const [category, setCategory] = useState("category");
  const [selection, setSelection] = useState<Product | undefined>();
  const { cart, setCart } = useContext(CartContext);


  /**
   * Searches through event listener to find products with matching name.
   * @param e event listener
   */
  let search = (e: SyntheticEvent) => {
    let value = (e.target as HTMLInputElement).value; // gets value from input element.

    if (!value) {
      setFilteredProducts(products); // if true then setFilteredProducts to empty list.
    } else {
      let results = products.filter((product: Product) => {
        return product.name.toLowerCase().includes(value.toLowerCase()); //returns filtered products list using value and product name.
      })
      setFilteredProducts(results); // else setFilteredProducts to the results list.
    }

  }

  /**
   * Checks if category state equals "category", 
   * If category does not equal "category", 
   * then it will filter the products.
   */
  let categorySearch = () => {
    if (category === "category") {
      setFilteredProducts(products); // if true then setFilteredProducts to products.
    } else {
      let results = products.filter((product: Product) => {
        return product.category.toLowerCase().includes(category.toLowerCase()); //returns filtered products list using value and product category.
      })
      if (results.length === 0) {
        setFilteredProducts([]); // if true then setFilteredProducts to empty list.
      } else {
        setFilteredProducts(results); // else setFilteredProducts to the results list.
      }
    }
  }

  useEffect(() => { // Runs categorySearch() when true.
    if (filterBy === "category") {
      categorySearch();
    }
  })


  // // Commented out (for now) until apiGetAllProducts is synced with API
  // useEffect(() => { // Fetch's products and set state of products and filteredProducts.
  //   const fetchData = async () => {
  //     const result = await apiGetAllProducts();
  //     setProducts(result.payload);
  //     setFilteredProducts(result.payload);
  //   }
  //   fetchData()
  // }, [])

  useEffect( () => { // runs startUp() only once on page load
    if (!hasGottenMockData) {
      hasGottenMockData = true;
      getMockData();
    }
  }, []);

  useEffect( () => { // when product list loads, copy to filteredProducts for display
    setFilteredProducts(products)
  }, [products]);

    /**
   * Gets JSON text from a static webpage 
   * Mocks API's getAllProducts endpoint 
   * stores response body as Products state
   */
  const getMockData = (async () => {
    let resp = await fetch(mockDataPath);
    if (Math.floor(resp.status/100) === 2) { // 200 expected
      let data = await resp.json();
      console.log("Mock data fetch successful");
      setProducts(await data as unknown as Product[]);
    } else {
      console.log("Mock data fetch failed with code "+resp.status);
    }
  });




   /**
   * Adds the selected item to cart
   */
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
    <div>
      {(selection) ? // Appears only if an image is clicked
      <>
        <div onClick={()=> {setSelection(undefined)}}> {/* if popup image clicked, it derenders */}
          <div 
            style = {{
              position:'fixed', zIndex:11, 
              maxWidth:"70%", height:"90%"
            }} >
            <img // load the medium-size image to display
              src={selection.imgUrlMed}
              style = {{ 
                fontSize:50, 
                maxWidth:"100%", maxHeight:"100%", 
                marginLeft:"5%",
                marginRight:"5%",
                marginTop:"5%",
                marginBottom:"5%",
                boxSizing: "border-box", opacity:"1",
                border: "20px solid rgba(255, 255, 240, 0.8)", // ivory color, 80% visible
                borderRadius: '16px' // makes border around image have rounded edges
              }}>
            </img>
          </div>
          </div>
            <Draggable > 
              {/* Moveable information box */}
              <div style = {{ 
                position:'fixed', zIndex:12, 
                width:"300px", height:"450px", opacity:"0.9",
                backgroundColor:"skyblue", color:"white", border:"2px solid ivory", 
                boxSizing: "border-box", padding:"10px", borderRadius: '16px',
                marginLeft:"60%", marginTop:"10%", 
                fontWeight:"500",
              }}> 
                <p style={{textAlign:"center", fontWeight:700, fontSize:"1.2em"}}>Draggable Information Box</p>
                <p style={{textAlign:"center", fontWeight:500, fontSize:"1em"}}>(Click image to close)</p>
                <p>Product ID: {selection.productId}</p>
                <p>Description: {selection.description}</p>
                <p>Product Name: {selection.name}</p>
                <p>Category: {selection.category}</p>
                <p>Price: $ {selection.price}</p>
                <p onClick={() => {addItemToCart({...selection})}}>Click to add item to cart</p> 
              </div>
            </Draggable>
       </> : <></>} {/* If selection falsey, overlay derenders */}
      <React.Fragment>
        <Navbar />
        <SearchDiv>
          {/*Conditionally renders SearchByName*/}
          {filterBy === "name" ? <SearchBar type='text' onChange={search} placeholder="Search" className='searchbar'></SearchBar> : null}
          {/*Conditionally renders SearchByCategory*/}
          {filterBy === "category" ?
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={category}
              label="Search"
              onChange={event => setCategory(event.target.value as string)}            >
              <MenuItem value="category">Category</MenuItem>
              {categories.map((cat) => (  // builds dropdown menu from categories
                <MenuItem value={cat} key={cat}>{cat}</MenuItem>
              ))}
            </Select> : null}
          {/*Filter Option Dropdown Selector*/}
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
          {/*if filteredProducts length less than or equal to 0, it renders Text Component*/}
          {filteredProducts.length <= 0 && <Text>No Products Found</Text>}
          {/*if filteredProducts length is greater than 0, it renders mapped products*/}
          {filteredProducts.length > 0 && filteredProducts.map((item) => (
            <ProductCard product={item} key={item.productId} setSelection={setSelection}/>))}
        </Container>
      </React.Fragment>
    </div>
  );
};
