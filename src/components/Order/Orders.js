import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import API from '../Config/Api';
import OrderItem from './OrderItem'
export default function Order() {

    const [user , setuser] = useState("");
    const [orderItem, setOrderItem] = useState([]);
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    let idUser = localStorage.getItem("id")
    useEffect(() => {
           setuser(localStorage.getItem("token"));

           API.get('/client/invoice/' + idUser, token)
           .then(response => {
               console.log(response.data.content)
                setOrderItem(response.data.content)
           })
           .catch(function (error) {
             console.log(error)
           }) 
    }, [])

    return (
        (user !== null) ? (    
        <div className="my-account">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                        <Link to="/myaccount" className="nav-link" id="address-nav" data-toggle="pill" href="#address-tab" role="tab"><i className="fa fa-user"></i>My account</Link>
                        <Link to="/order" className="nav-link" id="orders-nav" data-toggle="pill" href="#orders-tab" role="tab"><i className="fa fa-shopping-bag"></i>Orders</Link>
                        <Link to="/updateaccount" className="nav-link" id="account-nav" data-toggle="pill" href="#account-tab" role="tab"><i className="fa fa-user"></i>Update Account</Link>
                        <button className="nav-link" href="index.html"><i className="fa fa-sign-out-alt"></i>Logout</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="orders-tab" role="tabpanel" aria-labelledby="orders-nav">
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>No</th>
                                            <th>Product</th>
                                            <th>Date</th>
                                            <th>Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* <tr>
                                            <td>1</td>
                                            <td>Product Name</td>
                                            <td>01 Jan 2020</td>
                                            <td>$99</td>
                                            <td>Approved</td>
                                            <td><button className="btn">View</button></td>
                                        </tr> */}
                                        {(Array.isArray(orderItem) && orderItem.length > 0) ? (
                                            orderItem.map((order, index) =>          
                                            <OrderItem order={order}  key={index}  />
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
                </div>
            </div>
        </div>
    </div> ) :(
        <div className="dangnhap">Bạn cần đăng nhập </div>
    )
    )
}
