import { Select, MenuItem } from '@mui/material';
import React, { SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Product from '../../models/Product';
import { apiGetAllProducts } from '../../remote/e-commerce-api/productService';
import { ProductCard } from './ProductCard';

// Container Styling Componenet
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

// SearchDiv Styling Componenet
const SearchDiv = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-size: 30px;
`;

// SearchBar Styling Componenet
const SearchBar = styled.input`
    border: none;
    width: 30%;
    font-size: 30px;
    border-bottom: 1px solid;
    outline: none;
    padding: 10px 0px;
`;

// H1 Styling Component
const Text = styled.h1`
    font-size: 30px;
    font-weight: bold;
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
    width: 100%;
`;

// List of categories for Product Filter
const categories: string[] = ['Cloud', 'Dawn', 'Day', 'Dusk', 'Moon', 'Night', 'Space', 'Sun'];

export const DisplayProducts = () => {
    // State initalizers
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
    const [filterBy, setFilterBy] = useState('name');
    const [category, setCategory] = useState('category');
    filteredProducts?.sort((a: Product, b: Product) => (a.productId > b.productId ? 1 : -1)); // sorts products by productId.

    /**
     * Searches through event listener to find products with matching name.
     *
     * @param {SyntheticEvent} e event listener
     */
    const search = (e: SyntheticEvent) => {
        const value = (e.target as HTMLInputElement).value; // gets value from input element.

        if (!value) {
            setFilteredProducts(products); // if true then setFilteredProducts to empty list.
        } else {
            const results = products.filter((product: Product) => {
                return product.name.toLowerCase().includes(value.toLowerCase()); // returns filtered products list using value and product name.
            });
            setFilteredProducts(results); // else setFilteredProducts to the results list.
        }
    };

    /**
     * Checks if category state equals 'category',
     * If category does not equal 'category',
     * then it will filter the products.
     */
    const categorySearch = () => {
        if (category === 'category') {
            setFilteredProducts(products); // if true then setFilteredProducts to products.
        } else {
            const results = products.filter((product: Product) => {
                return product.category.toLowerCase().includes(category.toLowerCase()); // returns filtered products list using value and product category.
            });
            if (results.length === 0) {
                setFilteredProducts([]); // if true then setFilteredProducts to empty list.
            } else {
                setFilteredProducts(results); // else setFilteredProducts to the results list.
            }
        }
    };

    useEffect(() => {
        // Runs categorySearch() when true.
        if (filterBy === 'category') {
            categorySearch();
        }
    });

    useEffect(() => {
        // Fetch's products and set state of products and filteredProducts.
        const fetchData = async () => {
            const result = await apiGetAllProducts();
            setProducts(result.payload);
            setFilteredProducts(result.payload);
        };
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <SearchDiv>
                {/* Conditionally renders SearchByName*/}
                {filterBy === 'name' ? (
                    <SearchBar
                        type='text'
                        onChange={search}
                        placeholder='Search'
                        className='searchbar'
                    ></SearchBar>
                ) : null}
                {/* Conditionally renders SearchByCategory*/}
                {filterBy === 'category' ?
                    <Select
                        labelId='demo-simple-select-helper-label'
                        id='demo-simple-select-helper'
                        value={category}
                        label='Search'
                        onChange={event => setCategory(event.target.value as string)}            >
                        <MenuItem value='category'>Category</MenuItem>
                        {categories.map((cat) => (  // builds dropdown menu from categories
                            <MenuItem value={cat} key={cat}>{cat}</MenuItem>
                        ))}
                    </Select> : null}
                {/* Filter Option Dropdown Selector*/}
                <Select
                    id='demo-simple-select-helper'
                    value={filterBy}
                    onChange={(event) => setFilterBy(event.target.value as string)}
                >
                    <MenuItem value='name'>Search By Name</MenuItem>
                    <MenuItem value='category'>Search By Category</MenuItem>
                </Select>
            </SearchDiv>
            <Container>
                {/* if filteredProducts length less than or equal to 0, it renders Text componenet*/}
                {filteredProducts.length <= 0 && <Text>No Products Found</Text>}
                {/* if filteredProducts length is greater than 0, it renders mapped products*/}
                {filteredProducts.length > 0 &&
                    filteredProducts.map((item) => <ProductCard product={item} key={item.productId} />)}
            </Container>
        </React.Fragment>
    );
};
