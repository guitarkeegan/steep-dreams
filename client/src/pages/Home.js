import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_PRODUCTS } from "../utils/queries";
import Products from "./Products";
// useing query to render products
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main>
      <div className="d-flex justify-content-around align-items-center mx-3 p-3">
        <p className="hero-content my-5 py-5">
          <h3>
            “There’s something hypnotic about the word tea.” <br />  
          </h3>
          <span>– Dorothy Sayers</span>
        </p>
      </div>

      <div className="container-fluid">
        <div className="row text-center m-3 px-5 text-light">
        
          <div className=" col-12 col-md-6 px-0">
            <img
              className="home-card img-fluid "
              src="https://images.unsplash.com/photo-1649275435675-c1b92e040a19?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80"
            />
          </div>


          <div className="col-12 col-md-6 px-0 mx-0">
            <h3><em>Accidental Discovery of Tea</em></h3>
            <p className="my-5 home-content">
              In 2737 BC, legend has it that leaves from a tree dropped into
              Emperor Shen Nung's cup of boiling water. The servant had boiled
              the water for hygienic reasons before the emperor was to drink it.<br/>
              But this time the water was turned brown by the wayward leaves.
              Being a scientist, the emperor was curious and decided to try some
              of this new liquid He found the liquid aromatic and refreshing.
              Since that serendipitous beginning, tea has been part of many
              cultures down through the years
            </p>
          </div>
        </div>
        <div className="row d-flex text-center m-3">
        <div className="col-12 col-md-6 text-light my-5 py-5">
 
            <h3><em>Why being A Tea Lover Is Good ?</em></h3>
            <p className="my-5 home-content">
            The benefits of drinking tea daily are endless, and Steep Dreams  is here to help you find the perfect tea to support your health goals. Please note that everyone’s wellness journey will differ, and diet, exercise, genetics, and more are all key components to consider when developing your personal regimen. We encourage you to find what works best for you and your body to promote inner and outer wellness. 
            </p>
          </div>
          <div className="col-12 col-md-6 my-5">
          <img
              className="home-card img-fluid"
              src="https://images.unsplash.com/photo-1612846213933-916a1f56d859?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
            />

          </div>
           

        </div>
      </div>
    </main>
  );
};

export default Home;
