import React, { useState } from 'react'
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Api from '../Config/Api'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Register() {
    const history=useHistory();
    const [isLoading, setIsLoading] = useState(false)
    const [user , setuser] = useState({
        username: "",
        password: "",
        fullname: "",
        address: "",
        email: "",
        phoneNumber: "",
        id_role: 3
    });
    const [message , setmessage] = useState("")
    const [RetypePassword, setRetypePassword] = useState("");
    const register =  (e) =>{
        toast.configure();
        if( user.fullName === "" || user.phoneNumber === "" || user.password === "" || user.address === "" || user.email === "" || user.username === "" || RetypePassword ==="" ) {
            setmessage("You have not entered enough");
        }else {
            if(RetypePassword !== user.password){
                setmessage(" Retype Password Don't Correct ");
            }
            else {
                setIsLoading(true)
                Api.post("client/register/user", user).then((response)=> {
                    setIsLoading(false)
                    toast('Register New Account Successfully', {position : toast.POSITION.TOP_CENTER})
                    history.push("/login");
                }).catch((error) =>{
                    setIsLoading(false)
                    alert(error.response.data);
                    console.log(error.response.data)
                });
            }
        }
    }
    return (
        <div>
            <div className="breadcrumb-wrap">
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <Link to="/"  class="breadcrumb-item">Home</Link>
                        <Link to="/products"  class="breadcrumb-item">Products</Link>
                        <li className="breadcrumb-item active">Register</li>
                    </ul>
                </div>
            </div>
            <div className="login">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">    
                            <div className="register-form">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Full Name</label>
                                        <input className="form-control" type="text" placeholder="Full Name"
                                         onChange={e => setuser({...user ,fullName : e.target.value})} value={user.fullName}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Email "</label>
                                        <input className="form-control" type="text" placeholder="Email"
                                         onChange={e => setuser({...user ,email : e.target.value})} value={user.email}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Address </label>
                                        <input className="form-control" type="text" placeholder="Address"
                                         onChange={e => setuser({...user ,address : e.target.value})} value={user.address}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Phone Number</label>
                                        <input className="form-control" type="text" placeholder="Phone Number"
                                         onChange={e => setuser({...user ,phoneNumber : e.target.value})} value={user.phoneNumber}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>User Name</label>
                                        <input className="form-control" type="text" placeholder="username"
                                         onChange={e => setuser({...user ,username : e.target.value})} value={user.username}></input>
                                    </div>
                                    <div className="col-md-6">
                                        <label>Password</label>
                                        <input className="form-control" type="password" placeholder="Password"
                                         onChange={e => setuser({...user ,password : e.target.value})} value={user.password}></input>
                                    </div>
                                    <div className="col-md-12">
                                        <label>Retype Password</label>
                                        <input className="form-control" type="password" placeholder="Password"
                                        onChange={e => setRetypePassword(e.target.value)} value={RetypePassword}></input>
                                    </div>
                                    {message && (
                                        <div className="error-mesage"><h3>{message}</h3></div>
                                    )}
                                    <div className="col-md-12">
                                        <button className="btn" onClick = {register}>{ isLoading ? "Loading" : "Submit"}</button>
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

export default Register
