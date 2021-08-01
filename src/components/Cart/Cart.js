import React, { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import API from '../Config/Api';
import NumberFormat from 'react-number-format';
import CartItem from './CartItem'
import {LoginContext} from '../../context/LoginContext'
function Cart() {
    const numberCart = useContext(LoginContext);
    const [productItem, setProductItem] = useState([]);
    const [total, setTotal] = useState(0);

	useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        console.log(cart)
        let keys = [];

        for (var item in cart) {
            if(cart.hasOwnProperty(item)){
              keys.push(item)
            }
          }
        if (!cart) return; 

        API.get('client/product')
        .then(response => {
            console.log(response.data.content)
            let total = 0;
            let listProduct = response.data.content
            let productItem = []
           console.log(keys)
            listProduct.forEach(function(element){
                keys.forEach(function(key){
                    if(key == element.id) {
                        element.qty = cart[key]
                        var dem = 0
                        productItem.forEach(function(product){
                            if(product.id == element.id){
                                dem++;
                                return false;      
                            } 
                        })  
                        if (dem == 0) productItem.push(element)                                                           
                    }
                })
            });

            console.log(productItem)

            for (var i = 0; i < productItem.length; i++) {
                total += productItem[i].price * productItem[i].qty;
            }
            
            setProductItem(productItem)
            setTotal(total)

        })
        .catch(function (error) {
          console.log(error)
        }) 
    }, []);
	

    const removeFromCart = (product) => {
        setProductItem(productItem.filter((item) => item.id !== product.id));
        let cart = JSON.parse(localStorage.getItem('cart')); //get cart form localStorage and convert to array
        delete cart[product.id.toString()]; //delete item in cart with id delete
        localStorage.setItem('cart', JSON.stringify(cart)); //convert cart to json and save to localStorage
       
        setTotal(total - (product.qty * product.price))
       numberCart.countNumberInCart()
    }

    const changeQty = (product, qty) => {
        let cart = JSON.parse(localStorage.getItem('cart')); //get cart form localStorage and convert to array
        // let {productItem} = this.state  
        setProductItem(productItem)
        let total = 0;
        // console.log(product.item.id)
        for (var i = 0; i < productItem.length; i++) {

            if(productItem[i].id === product.id) {
                productItem[i].qty = qty
                cart[product.id] = qty;  //and set qty to cart
            }
            total += productItem[i].price * productItem[i].qty;
        }
        localStorage.setItem('cart', JSON.stringify(cart)); //convert cart to json and save to localStorage

        setTotal(total)
    }

   
    const renderProductCart = () => {  
        if(Array.isArray(productItem) && productItem.length > 0) {
            return productItem.map((product, index) => 
                
                <CartItem product={product} remove={removeFromCart} key={index} changeQty={changeQty} />
            )
        }
        
    }

    const onVisible = () => {
        if (localStorage.getItem("appState") === null) {
            
        }else{
            return (
                <button type="button" className="btn btn-warning btn-sm" ><Link to="/checkout" style={{color: "white"}}><i className="fa fa-credit-card"> Thanh toán</i></Link></button>
            )
        }
    }

    return (
        
        <div>
            <div className="breadcrumb-wrap">
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active">Cart</li>
                    </ul>
                </div>
            </div>
        
        <div className="cart-page">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="cart-page-inner">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        {/* {renderProductCart()} */}
                                        {(Array.isArray(productItem) && productItem.length > 0) ? (
                                            productItem.map((product, index) =>          
                                            <CartItem product={product}  remove={removeFromCart} key={index} changeQty={changeQty} />
                                            )
                                        ) :(
                                            <div>
                                                
                                            </div>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="cart-page-inner">
                            <div className="row">
                                <div className="col-md-12">
                                    {/* <div className="coupon">
                                        <input type="text" placeholder="Coupon Code"></input>
                                        <button>Apply Code</button>
                                    </div> */}
                                </div>
                                <div className="col-md-12">
                                    <div className="cart-summary">
                                        <div className="cart-content">
                                            <h1>Cart Summary</h1>
                                            <p>Sub Total<span><NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></span></p>
                                            <p>Shipping Cost<span></span></p>
                                            <h2>Grand Total<span><NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></span></h2>
                                        </div>

                                        {(Array.isArray(productItem) && productItem.length > 0) ? (
                                            <div className="cart-btn">
                                                <button><Link to="/checkout" style={{color: "black"}}>Checkout</Link></button>
                                            </div>
                                        ) :(
                                            <div>
                                                
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    )

}
export default Cart