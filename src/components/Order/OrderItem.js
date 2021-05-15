import React, { Component, useEffect, useState } from 'react';
// import { Link } from "@reach/router";
import NumberFormat from 'react-number-format';
import config from '../Config/Config';

function OrderItem(props) {
    const { order } = props;
    console.log(order);
    const view = (e) => {
        // console.log(e.target)
    } 
    return (
        <tr>
            <td>{order.id}</td>
            <td>{order.name_Product}</td>
            <td>01 Jan 2020</td>
            <td>${order.total_Money}</td>
            <td>Approved</td>
            <td><button id={order.id} className="btn" onClick={view}>View</button></td>
        </tr>
    )
    
}
export default OrderItem