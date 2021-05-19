import React, { Component, useEffect , useState } from 'react';
// import { Link } from "@reach/router";
import NumberFormat from 'react-number-format';
import config from '../Config/Config';

function CheckoutBuyNowItem(props) {

    const [quantity, setQuantity] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const { product } = props;
        setQuantity(product.qty)
        setTotalPrice(product.price * product.qty)
    }, []);

    
    const handleChangeQty = (e) => {
        const { product } = props;
        props.changeQty(props.product, e.target.value)
        setQuantity(parseInt(e.target.value))
        setTotalPrice(product.price * e.target.value)
    }
    
    const addQty= (e) => {
        e.preventDefault();
        const { product } = props;
        // let quantity = quantity
        if(product.number > quantity) {

            setQuantity(parseInt(quantity) + 1)
            setTotalPrice( product.price * (parseInt(quantity) + 1) )
            props.changeQty(product, parseInt(quantity) + 1)
        }
    }

    const removeQty = (e) => {
        e.preventDefault();
        const { product } = props;
        // let quantity = quantity
        if(quantity > 1) {
            setQuantity(parseInt(quantity) - 1)
            setTotalPrice( product.price * (parseInt(quantity) - 1) )
            props.changeQty(product, parseInt(quantity) - 1)
        }  else {
            props.remove(product)
        }     
    }
    const { product } = props;

        return (
            <tr>
                <td>
                    <div className="img">
                        <img src={product.link} alt="Image"></img>
                        <p>{product.name}</p>
                    </div>
                </td>
                <td><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></td>
                <td>
                    <div className="qty">
                        <button className="btn-minus" onClick={removeQty}><i className="fa fa-minus" ></i></button>
                        <input type="text" onChange={handleChangeQty} value={quantity}></input>
                        <button className="btn-plus" onClick={addQty}><i className="fa fa-plus"></i></button>
                    </div>
                </td>
                <td><NumberFormat value={totalPrice} displayType={'text'} thousandSeparator={true} prefix={'VND'}/></td>
            </tr>
        )
    
}
export default CheckoutBuyNowItem