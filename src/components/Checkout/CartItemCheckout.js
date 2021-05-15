import React, { Component, useEffect, useState } from 'react';
// import { Link } from "@reach/router";
import NumberFormat from 'react-number-format';
import config from '../Config/Config';

function CartItemCheckout(props) {
    
    let { product } = props;
    
    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        console.log(props)
        setQuantity(product.qty)
        setTotalPrice(product.price * product.qty)
    }, []);

    

    return (
        <tr>
            <td>
                <div className="img">
                    <a href="#"><img src={product.link} alt="Image"></img></a>
                    <p>{product.name}</p>
                </div>
            </td>
            <td><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></td>
            <td>
                <div className="qty">                       
                    <input type="text"  value={quantity}></input>                       
                </div>
            </td>
            <td><NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true} prefix={'VND'}/></td>
            
        </tr>
    )

}
export default CartItemCheckout