import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router'
import {NavLink} from 'react-router-dom'
import {LoginContext} from '../../context/LoginContext'
import logo from './image/logo.png'
function Header() {
    const login = useContext(LoginContext);
    const [countCart, setCountCart] = useState(0);
    const [searchStr, setsearchStr] = useState("")
    const [menu, setmenu] = useState("")
    var fullname = login.Fullname;
    const history = useHistory();
    useEffect(() => {
           login.LoginDispatch();
    }, [fullname])
   
    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let count = 0
        for (var item in cart) {
            count++
        }
        setCountCart(count)
    }, [JSON.parse(localStorage.getItem('cart'))])

    const LogoutHandle = () =>{
        login.LogoutDispatch();
    }
    const ChangeToMyAccount = () => {
        history.push("/myaccount");
    }
    function search() {
        history.push({
            pathname: '/products',
            state: {
                check: 9, 
                id :0 ,
                search : searchStr
                }
            })
    }
    return (
        <div>
            <div className="top-bar">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                            <i className="fa fa-envelope"></i>
                            EstoreShop@email.com
                        </div>
                        <div className="col-sm-6">
                            <i className="fa fa-phone-alt"></i>
                            0339905697
                        </div>
                    </div>
                </div>
            </div>  
           
            <div className="nav">
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-md bg-dark navbar-dark">
                        <h1 className="navbar-brand">MENU</h1>
                        <button type="button" className="navbar-toggler"
                        onClick = { () => {setmenu(menu === "" ? "show" : "")}}>
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className={"collapse navbar-collapse justify-content-between "+ menu}>
                            <div className="navbar-nav mr-auto">
                                <NavLink to='/' activeStyle = {{
                                    color : 'black'
                                }} exact className="nav-item nav-link" >Home</NavLink>
                                <NavLink  to={{
                                        pathname: '/products',
                                        state: {
                                            check: 0, 
                                            id : 0
                                        }
                                        }} activeStyle = {{
                                           
                                            color : 'black'
                                        }} exact className="nav-item nav-link" >Products</NavLink>  
                                {fullname  &&                              
                                <NavLink to='/myaccount' activeStyle = {{
                                   
                                    color : 'black'
                                }} exact className="nav-item nav-link" >account</NavLink>
                                }
                                <NavLink to='/cart' activeStyle = {{
                                   
                                    color : 'black'
                                }} exact className="nav-item nav-link" >Cart</NavLink>
                                <NavLink to='/contact' activeStyle = {{
                                   
                                    color : 'black'
                                }} exact className="nav-item nav-link" >Contact</NavLink>
                                <NavLink to='/post' activeStyle = {{
                                   
                                    color : 'black'
                                }} exact className="nav-item nav-link" >Post</NavLink>
                            </div>
                            <div className="navbar-nav ml-auto">                               
                                {(login.IsLogin ===true ) ? ( 
                                        <div className="dropdown">
                                            <button className="dropbtn">Xin chào {fullname}</button>
											<div className="dropdown-content">
												<button onClick={LogoutHandle}>Logout</button>
												<button onClick={ChangeToMyAccount} >My accout</button>
											</div>
                                      </div>
                                    ) : (
                                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                                            <div className="navbar-nav mr-auto">
                                                    <NavLink to="/login" activeStyle = {{
                                                            color : 'black'
                                                        }} exact className="nav-item nav-link ">Login</NavLink>
                                                    <NavLink to="/register" activeStyle = {{
                                                            color : 'black'
                                                        }} exact className="nav-item nav-link">Register</NavLink>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="bottom-bar">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-md-3">
                            <div className="logo">
                                <NavLink to="/">
                                    <img src={logo} alt="Logo"></img>
                                </NavLink>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="search">
                                <input type="text" placeholder="Search" 
                                    onChange={e=>{setsearchStr(e.target.value)}} value={searchStr}></input>
                                <button><i className="fa fa-search" onClick={search}></i></button>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <div className="user">
                                <NavLink to="/cart" className="btn cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>({countCart})</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Header
