import React, {useState , useContext } from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useHistory} from 'react-router'
import {LoginContext} from '../../context/LoginContext'
const iStyle = {
    position: "absolute",
    marginTop: "-8px",
    marginLeft: "-20px",
    paddingTop: "10px",
    // backgroundColor: "rgb(255, 111, 97)",
    width: "40px",
    height: "40px",
};

const aStyle = {
    position: "relative",
    with: "40px",
    height: "40px"
}

function Card(props) {
    const login = useContext(LoginContext);
    const {product , star} = props;
    for(const temp of star){
        if(temp.id === product.id)
            product.numberOfStar = temp.numberOfStar;
    }
    let history = useHistory();
    var name = product.name.split(' ')
    if (name.length > 5) { product.name = name[0]+" "+name[1]+" "+name[2]+" "+name[3]+" "+name[4]+"..."}
    const [quantity, setquantity] = useState(1);
    const addToCart = (e) => {
        // console.log(e.target)
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        let id = e.target.id.toString();
        
        cart[id] = (cart[id] ? cart[id]: 0);
        
        let qty = cart[id] + parseInt(quantity);
        cart[id] = qty
        localStorage.setItem('cart', JSON.stringify(cart));
        login.countNumberInCart();
      }
    return (
        <div className="Product">
            <div className="product-item">
                    <div className="product-title">
                        <Link to={`/productdetail/${product.id}`}>
                           {product.name}
                        </Link>
                        <div className="ratting">
                            <i className={product.numberOfStar >=1 ?"fa fa-star": product.numberOfStar >= 0.5 ? 'fa fa-star-half-o':'fa fa-star-o'}></i>
                            <i className={product.numberOfStar >=2 ?"fa fa-star": product.numberOfStar >= 1.5 ? 'fa fa-star-half-o':'fa fa-star-o'}></i>
                            <i className={product.numberOfStar >=3 ?"fa fa-star": product.numberOfStar >= 2.5 ? 'fa fa-star-half-o':'fa fa-star-o'}></i>
                            <i className={product.numberOfStar >=4 ?"fa fa-star": product.numberOfStar >= 3.5 ? 'fa fa-star-half-o':'fa fa-star-o'}></i>
                            <i className={product.numberOfStar >=5 ?"fa fa-star": product.numberOfStar >= 4.5 ? 'fa fa-star-half-o':'fa fa-star-o'}></i>
                        </div>
                    </div>
                    <div className="product-image">
                        <a href="product-detail.html">
                            <img src={product.link} alt={product.name_Image}></img>
                        </a>
                        <div className="product-action">
                            <a><i style = {iStyle} id={product.id} onClick={addToCart} className="fa fa-cart-plus"></i></a>
                        </div>
                    </div>
                    <div className="product-price">
                        <h3>{product.price+" "}<span><h3> VND</h3></span></h3>
                        <button className="btn" onClick ={ e => {history.push(`/checkout-buy-now/${product.id}`)}}><i className="fa fa-shopping-cart"></i>Buy Now</button>
                    </div>
                    
            </div>
        </div>
    )
}

export default Card;
