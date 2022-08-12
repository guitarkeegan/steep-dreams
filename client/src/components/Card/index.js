import Auth from "../../utils/auth";

import {useState,useEffect} from 'react';

// Card 
function Card(props){


  //This is to fix the props getting lost when page is getting refreshed and saves the file name to the storage

 const sourceName=props.product.image ? props.product.image  : localStorage.getItem('imageName');

    const [imageName,setImageName]=useState(sourceName);

    useEffect(()=>{

      if(props.product.image){
        localStorage.setItem('imageName',props.product.image);
      }
      

    },[imageName]);


 

  return(
    <div className="card pb-2 px-2" >
      <div className="image-div">
          <img className="cardImage" src={require( `../../images/${sourceName}`)} alt=""/> 
      </div>
      <div className="card-header-div mb-5">
        <h2 className="cardTitle">{props.product.name}</h2>
      </div>
      <div className="card-body-div mb-5">
        <p className="cardDescription">{props.product.description}</p>
      </div>
      <div className="card-price-div">
        <h3 className="cardPrice">${props.product.price}</h3>
      </div>
      {Auth.loggedIn()?
      <button onClick={() => props.addToCart(props.product._id)} className="cardButton mb-2">Add to Cart</button>
      :
      <button  className="disabledButton mb-2" disabled>Add to Cart</button>
    }
      </div>
  )
}

export default Card;