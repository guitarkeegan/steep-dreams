
import {QUERY_PRODUCT_BY_NAME} from "../../utils/queries"
import { useQuery } from "@apollo/client";  

//Semantic UI Component
import { Search } from 'semantic-ui-react'


//Search Handler
function searchProduct(){

     
      console.log("Searching");
     
    }


const SearchBar=()=>{
      const { loading, data }=useQuery(QUERY_PRODUCT_BY_NAME);
      const products = data?.getProducts || [];
    
     return (<Search placeholder="Search Products" className="searchbar" onSearchChange={searchProduct}/> )
    


}


export default SearchBar;