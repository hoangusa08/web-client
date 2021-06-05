import React, { Component, useEffect, useState } from 'react';
// import { Link } from "@reach/router";
import NumberFormat from 'react-number-format';
import config from '../../Config/Config';
import { useHistory } from 'react-router';
function OrderItem(props) {
    const { order } = props;
    // console.log(order);
    const history = useHistory()
    const view = (e) => {
        // console.log(e.target)
    } 
    return (
        <tr>
            <td>{order.id}</td>
            <td>{order.total_Money}</td>
            <td>{(order.total_Money == true) ? "Paid" : "UnPaid"}</td>
            <td><button id={order.id} className="btn" onClick ={ e=> {history.push(`/view-order/${order.id}`)}}>View</button></td>
        </tr>
    )
    
}
export default OrderItem