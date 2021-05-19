import React, { useEffect, useState, useContext } from 'react'
import {Link} from 'react-router-dom'
import API from '../../Config/Api';
import OrderItem from './OrderItem'
import {LoginContext} from '../../../context/LoginContext'
export default function ViewOrder(props) {
    const imgStyle = {
        // border: '2px solid red',
        // borderRadius: '8px',
        width: '50px',
        display: 'inline'
    };
    const login = useContext(LoginContext)
    const [user , setuser] = useState("");
    const [orderItem, setOrderItem] = useState([]);
    // const [listInvoice, setListInvoice] = ([])
    const [totalMoney, setTotalMoney] = useState(0)
    const id = props.match.params.id
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    let idUser = localStorage.getItem("id")
    useEffect(() => {
           setuser(localStorage.getItem("token"));

           API.get('/client/invoice/' + idUser, token)
           .then(response => {
                // setOrderItem(response.data)
                let listProductOfInvoiceGetApi = response.data
                let listProductOfInvoiceHandled = [];
                let total_Money = 0
                listProductOfInvoiceGetApi.forEach(element => {
                    if(element.id == id) {
                        listProductOfInvoiceHandled.push(element)
                        total_Money += element.total_Money
                    }
                });

                setOrderItem(listProductOfInvoiceHandled)
                setTotalMoney(total_Money)
           })
           .catch(function (error) {
             console.log(error)
           }) 
    }, [])

    return (
        (login.IsLogin !== false) ? (
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
                                            <th>Image</th>
                                            <th>Name Product</th>
                                            <th>Price</th>
                                            <th>Nummber</th>
                                            <th>Total Money</th>
                                           
                                        </tr>
                                    </thead>
                                    <tbody className="align-middle">
                                        {(Array.isArray(orderItem) && orderItem.length > 0) ? (
                                            orderItem.map((order, index) =>          
                                                <tr>
                                                    <td>
                                                    <img src={order.linkImage} alt="Image" style={imgStyle}></img>
                                                    </td>
                                                    <td>
                                                        <div className="img">
                                                            
                                                            <p>{order.name_Product}</p>
                                                        </div>
                                                    </td>
                                                    
                                                    <td>{order.price}</td>
                                                    <td>{order.number_Product}</td>
                                                    <td>{order.total_Money}</td>
                                                </tr>
                                            )

                                            ) :(
                                                <tr></tr>
                                            )}
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>{"Total Money: " + totalMoney}</td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> ) :(
        <div className="dangnhap">You need to login </div>
    )
    )
}
