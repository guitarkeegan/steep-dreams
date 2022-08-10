import Auth from "../../utils/auth"


// Card 
function Card(props){
   
  return(
    <div className="card" >
      <div className="image-div">
        <img className="cardImage" src={require( `../../images/${props.product.image}`)} alt=""/>
      </div>
      <div className="card-header-div">
        <h2 className="cardTitle">{props.product.name}</h2>
      </div>
      <div className="card-body-div">
        <p className="cardDescription">{props.product.description}</p>
      </div>
      <div className="card-price-div">
        <h3 className="cardPrice">${props.product.price}</h3>
      </div>
      {Auth.loggedIn()?
      <button onClick={() => props.addToCart(props.product._id)} className="cardButton">Add to Cart</button>
      :
      <button  className="disabledButton" disabled>Add to Cart</button>
    }
      </div>
  )
}

export default Card;