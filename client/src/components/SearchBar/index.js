
import {QUERY_PRODUCT_BY_NAME} from "../../utils/queries"
import { useQuery } from "@apollo/client";  
import Form from 'react-bootstrap/Form';
import React, {useState} from 'react';

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
      
  const [searchInput, setSearchInput] = useState('');
      // TODO: create an array of item names, as the user types into the search bar, iterate throught the list with a regex to limit the dropdown results
      const updateSearch = (input) => {
        setSearchInput(input);
      }
    
     return (
      
        <div className="ui search searchbar">
        <Form className="d-flex justify-content-center align-items-center">
          <Search placeholder="Search Products" onSearchChange={(e) => updateSearch(e.target.value)} className="col-6"/> 
          <button className="searchBtn col-3" onClick={searchProduct}>Search</button>
        </Form>
        </div>
     )
}


export default SearchBar;