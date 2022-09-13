
import {QUERY_PRODUCTS, QUERY_PRODUCT_BY_NAME} from "../../utils/queries"
import { useQuery } from "@apollo/client";  
import Form from 'react-bootstrap/Form';
import React, {useState, useEffect, useReducer, useRef, useCallback} from 'react'
//Semantic UI Component
import { Search, Grid } from 'semantic-ui-react';
import Button from 'react-bootstrap/Button';
import _ from 'lodash';


//Search Handler
function searchProduct(event){
      event.preventDefault();

      const searchElement=document.querySelector('.searchbar input');
      
      localStorage.setItem("search_value",JSON.stringify(searchElement.value));
      window.location.assign(`/products/${searchElement.value}`);
    }

const initialState = {
  loading: false,
  results: [],
  value: '',
};

function searchReducer(state, action){
  switch (action.type){
    case 'CLEAN_QUERY':
      return initialState
    case 'START_SEARCH':
      return { ...state, loading: true, value: action.query }
    case 'FINISH_SEARCH':
      return { ...state, loading: false, results: action.results}
    case 'UPDATE_SELECTION':
      return { ...state, value: action.selection }
    default:
      throw new Error()
  }
}

const SearchBar=function(){

    // const [searchState, setSearchState] = useState('');
    const [state, dispach] = useReducer(searchReducer, initialState);
    const { loading, results, value } = state;

    const timeoutRef = useRef();

    const { error, data } = useQuery(QUERY_PRODUCTS);
    const products = data?.getProducts || [];
    


    const handleSearchChange = useCallback((err, data) => {
      clearTimeout(timeoutRef.current);
      dispach({type: 'START_SEARCH', query: data.value});

      timeoutRef.current = setTimeout(()=>{
        if (data.value.length === 0){
          dispach({type: 'CLEAN_QUERY'});
          return;
        }

        const re = new RegExp(_.escapeRegExp(data.value), 'i');
        const isMatch = (result) => re.test(result.name);

        dispach({
          type: 'FINISH_SEARCH',
          results: _.filter(products, isMatch)
        });
      }, 300);
      // array of dependencies?
    }, []);

    useEffect(()=>{
      return () => {
        clearTimeout(timeoutRef.current);
      }
    }, []);


    
    return (
      
        <div className="ui search searchbar">
        <Form className="d-flex justify-content-center align-items-center">
        <Grid>
        <Grid.Column width={10}>
          <Search
            loading={loading}
            results={results}
            onSearchChange={handleSearchChange}
            onResultSelect={(e, data)=> dispach({type: 'UPDATE_SELECTION', selection: data.result.name})}
            value={value}
            placeholder="Search Products"
            className="searchbar col-6"/> 
          
          </Grid.Column>
          <button className="searchBtn col-3" onClick={searchProduct}>Search</button>
          </Grid>
        </Form>
        </div>
     )
}
export default SearchBar;