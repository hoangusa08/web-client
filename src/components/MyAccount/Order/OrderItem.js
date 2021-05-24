import React from 'react';
import { useHistory } from 'react-router';
function OrderItem(props) {
    const { order } = props;
    // console.log(order);
    const history = useHistory()
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