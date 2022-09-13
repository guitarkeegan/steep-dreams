
import {QUERY_PRODUCTS, QUERY_PRODUCT_BY_NAME} from "../../utils/queries"
import { useQuery } from "@apollo/client";  
import Form from 'react-bootstrap/Form';
import React, {useState, useEffect} from 'react'
//Semantic UI Component
import { Search } from 'semantic-ui-react'
import Button from 'react-bootstrap/Button';


//Search Handler
function searchProduct(event){
      event.preventDefault();

      const searchElement=document.querySelector('.searchbar input');
      
      localStorage.setItem("search_value",JSON.stringify(searchElement.value));
      window.location.assign(`/products/${searchElement.value}`);
    }

const SearchBar=function(){

    const [searchState, setSearchState] = useState('');
    // const [allProducts, setAllProducts] = useState([])
    


    const { error, data } = useQuery(QUERY_PRODUCTS);
    const products = data?.getProducts || [];
    console.log(products);

    const handleChange = (e) => {
      
      setSearchState(e.target.value);
      // console.log(searchState)

    }


    
    return (
      
        <div className="ui search searchbar">
        <Form className="d-flex justify-content-center align-items-center">
          <Search results={products.name} onSearchChange={handleChange}  placeholder="Search Products" className="searchbar col-6"/> 
          <button className="searchBtn col-3" onClick={searchProduct}>Search</button>
        </Form>
        </div>
     )
}
export default SearchBar;