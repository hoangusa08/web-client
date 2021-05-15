import React, { useEffect, useState,useContext } from 'react'
import {Link , useHistory} from 'react-router-dom'
import {LoginContext} from '../../context/LoginContext'
import Api from '../Config/Api';
export default function MyAccount() {
    const login = useContext(LoginContext);
    const history = useHistory();
    const [ account, setaccount] = useState({
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
        Api.get(`client/user/${localStorage.getItem("id")}`,token).then((response)=> {
            setaccount(response.data);
        }).catch((error) =>{
        });
    }, [localStorage.getItem("token")])

    const LogoutHandle = () =>{
        login.LogoutDispatch();
    }
    return (
        (login.IsLogin !== false) ? (    <div className="my-account">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                        <Link to="/myaccount" className="nav-link" id="address-nav" data-toggle="pill" href="#address-tab" role="tab"><i className="fa fa-user"></i>My account</Link>
                        <Link to="/order" className="nav-link" id="orders-nav" data-toggle="pill" href="#orders-tab" role="tab"><i className="fa fa-shopping-bag"></i>Orders</Link>
                        <Link to="/updateaccount" className="nav-link" id="account-nav" data-toggle="pill" href="#account-tab" role="tab"><i className="fa fa-user"></i>Update Account</Link>
                        <button className="nav-link" onClick={LogoutHandle} ><i className="fa fa-sign-out-alt"></i>Logout</button>
                    </div>
                </div>
                <div className="col-md-9">
                    <div className="tab-content">
                        <div className="tab-pane fade show active" id="address-tab" role="tabpanel" aria-labelledby="address-nav">
                            <h4>My Account</h4>
                            <div className="row">
                                <div className="col-md-12">
                                    <h5>Payment Address</h5>
                                    <p> Name : </p>
                                    <input className="form-control inputdisable" type="text" value={account.fullName} disabled></input>
                                    <p> UserName :</p>
                                    <input className="form-control inputdisable" type="text" value= {account.username} disabled></input>
                                    <p> Email : </p>
                                    <input className="form-control inputdisable" type="text" value={account.email} disabled></input>
                                    <p> Mobile: </p>
                                    <input className="form-control inputdisable" type="text" value={account.phoneNumber} disabled></input>
                                    <p> Address :</p>
                                    <input className="form-control inputdisable" type="text" value= {account.address} disabled></input>
                                    <button className="btn"onClick={() => ( history.push("/updateaccount"))}>Edit Account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div> ) :(
        <div className="dangnhap">You Need Login </div>
    )
    )
}
