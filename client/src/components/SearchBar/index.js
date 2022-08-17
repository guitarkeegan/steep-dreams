
import {QUERY_PRODUCT_BY_NAME} from "../../utils/queries"
import { useQuery } from "@apollo/client";  
import Form from 'react-bootstrap/Form';

//Semantic UI Component
import { Search } from 'semantic-ui-react'
import Button from 'react-bootstrap/Button';


//Search Handler
function searchProduct(event){
      event.preventDefault();

      const searchElement=document.querySelector('.searchbar input');
      console.log(searchElement.value);
     
      console.log("Search Element",searchElement);
      localStorage.setItem("search_value",JSON.stringify(searchElement.value));
      window.location.assign(`/products/${searchElement.value}`);
      

    }


const SearchBar=function(){
      
    
     return (
      
        <div className="ui search searchbar">
        <Form className="d-flex justify-content-center align-items-center">
          <Search placeholder="Search Products" className="searchbar col-6"/> 
          <button className="searchBtn col-3" onClick={searchProduct}>Search</button>
        </Form>
        </div>

      

     )

    


}


export default SearchBar;