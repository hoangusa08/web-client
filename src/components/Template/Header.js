import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'
import {LoginContext} from '../../context/LoginContext'
import logo from './image/logo.png'
function Header() {
    const login = useContext(LoginContext);
    const [countCart, setCountCart] = useState(0);
    const [searchStr, setsearchStr] = useState("")
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
                        <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
                            <div className="navbar-nav mr-auto">
                                <Link to='/'className="nav-item nav-link" >Home</Link>
                                <Link  to={{
                                        pathname: '/products',
                                        state: {
                                            check: 0, 
                                            id : 0
                                        }
                                        }}className="nav-item nav-link" >Products</Link>  
                                {fullname  &&                              
                                <Link to='/myaccount'className="nav-item nav-link" >account</Link>
                                }
                                <Link to='/cart'className="nav-item nav-link" >Cart</Link>
                                <Link to='/contact'className="nav-item nav-link" >Contact</Link>
                                <Link to='/post'className="nav-item nav-link" >Post</Link>
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
                                                    <a href="/login" className="dropdown-item color">Login</a>
                                                    <a href="/register" className="dropdown-item color">Register</a>
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
                                <a href="/">
                                    <img src={logo} alt="Logo"></img>
                                </a>
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
                                <a href="/cart" className="btn cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>({countCart})</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Header
