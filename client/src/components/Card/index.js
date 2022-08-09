import Auth from "../../utils/auth"


// Card 
function Card(props){
   
  return(
    <div className="card" >
      <div className="cardBody">
        <img className="cardImage" src={require( `../../images/${props.product.image}`)} alt=""/>
        <h2 className="cardTitle">{props.product.name}</h2>
        <p className="cardDescription">{props.product.description}</p>
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