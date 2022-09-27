import React, { useState, useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Signup from "./pages/Signup";

import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Payment from "./pages/Payment";
import FilterProduct from "./pages/FilterProduct";
// import CheckoutSuccess from "./pages/CheckoutSuccess";
import { getSavedProductIds } from "./utils/localStorage";

import "./App.css";

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

//Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const savedProductIds = getSavedProductIds();
  const [savedProducts, setSavedProducts] = useState(savedProductIds);

  useEffect(() => {
    localStorage.setItem("saved_products", JSON.stringify(savedProducts));
  }, [savedProducts]);

  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-flex-start min-100-vh">
          <Header savedProductIds={savedProductIds} savedProducts={savedProducts} setSavedProducts={setSavedProducts}/>
          

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/products"
                element={
                  <Products
                    savedProducts={savedProducts}
                    setSavedProducts={setSavedProducts}
                  />
                }
              />
              <Route path="/orders" element={<Orders />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/products/:productName" element={<FilterProduct  savedProducts={savedProducts}
                    setSavedProducts={setSavedProducts} />} />
              {/* <Route path="/checkout-success" element={<CheckoutSuccess />} />    */}
            </Routes>
            <Footer/>
          </div>
 
        
      </Router>
    </ApolloProvider>
  );
}
export default App;
