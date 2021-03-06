import React, {Component, useState , useContext, useEffect } from 'react';
import { Link } from "react-router-dom";
import {useHistory} from 'react-router'
import API from '../Config/Api';
import NumberFormat from 'react-number-format';
import CartItemCheckout from './CartItemCheckout'
import {LoginContext} from '../../context/LoginContext'
function Checkout() {
    const [productItem , setProductItem] = useState([])
    const [total, setTotal] = useState(0)
    const [id, setId] = useState('')
    let history = useHistory();
    const login = useContext(LoginContext)
    
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    let idUser = localStorage.getItem("id")
    let fullName = localStorage.getItem("fullname")
    const [ user, setUser] = useState({
        username: "",
        password: "",
        fullName: "",
        address: "",
        email: "",
        phoneNumber: "",
})
    useEffect(() => {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        API.get(`client/user/${localStorage.getItem("id")}`,token).then((response)=> {
            setUser(response.data);
        }).catch((error) =>{
        });
    }, [localStorage.getItem("token")])

    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let keys = [];
        for (var item in cart) {
            if(cart.hasOwnProperty(item)){
            keys.push(item)
            }
        }
        if (!cart) return; 

        API.get('client/product/')
        .then(response => {
            // console.log(response.data.content)
            let total = 0;
            let listProduct = response.data.content
            let productItem = []
        
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
            // console.log(productItem)
            for (var i = 0; i < productItem.length; i++) {
                total += productItem[i].price * productItem[i].qty;
            }

            setProductItem(productItem)
            setTotal(total)
        })

    }, []);

    const addBill = (e) => {
        e.preventDefault();
        let id = e.target.id.toString();
        let cart = JSON.parse(localStorage.getItem('cart'));
        let listItem = [];
    
        let keys = [];
        for (var item in cart) {
            if(cart.hasOwnProperty(item)){
              keys.push(item)
            }
        }
    
        for(var item in cart) {
            var element = {
                "id" : Number(item),
                "number" : cart[item],
            }

            listItem.push(element);      
        }
    
 
        let flag = true
        
        const data = {
                id_user: idUser,
                id_employee: 124,
                totalMoney: total,
                listProducts: listItem
            } 
        console.log(data)
        API.post('client/invoice', data, token)
        .then(response => {
           
            console.log(response.data)
            // alert("?????t h??ng th??nh c??ng")
            window.localStorage.removeItem("cart")
            login.countNumberInCart();
            history.push({
                pathname: '/home',
                state: { report: 'Order Success' }
            })
    
        })
        .catch(errors => {
              console.log(errors)
        })
    }

  const renderProductCart = () => {
    console.log(productItem)
    // let {productItem} = this.state 
    if(Array.isArray(productItem) && productItem.length > 0) {
         productItem.map((product, index) =>          
            <CartItemCheckout product={product} remove={this.removeFromCart} key={index} changeQty={this.changeQty} />
        )
     } 
    }


    return (
        (login.IsLogin !== false) ? (
        <div>
            <div className="breadcrumb-wrap">
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Cart</a></li>
                        <li className="breadcrumb-item active">Checkout</li>
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

                                            </tr>
                                        </thead>
                                        <tbody className="align-middle">
                                            {(Array.isArray(productItem) && productItem.length > 0) ? (
                                                productItem.map((product, index) =>          
                                                <CartItemCheckout product={product}  key={index}  />
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
                                        <div className="cart-summary">
                                            <div className="cart-content">
                                                <h1>Customer Information</h1>
                                                <p><b>Address:</b> <span>{user.address} </span></p>
                                                <p><b>Phone:</b> <span>{user.phoneNumber}</span></p>
                                                <p><b>Full Name:</b> <span>{user.fullName}</span></p>
                                                <p><b>Email:</b> <span>{user.email}</span></p>
                                                <h1>Order Information</h1>
                                                <p>Sub Total<span><NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></span></p>
                                                <p>Shipping Cost<span></span></p>
                                                <h2>Grand Total<span><NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></span></h2>
                                            </div>

                                            <div className="cart-btn ">
                                                {/* <button>Update Cart</button> */}
                                                <button id = {id} style={{color: "black"}} onClick={addBill}>Confirm To Pay</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>) : (
        <div className="dangnhap">You need to login </div>
    )
    )
  

}

export default Checkout
