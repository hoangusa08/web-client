import React, {useContext, useEffect, useRef, useState} from 'react'
import {useHistory} from 'react-router'
import {Link} from 'react-router-dom'
import {LoginContext} from '../../context/LoginContext'
import Api from '../Config/Api'
import logo from './image/logo.png'
function Header() {
    const login = useContext(LoginContext);
    const [listSearch, setlistSearch] = useState([]);
    const [searchStr, setsearchStr] = useState("")
    const [toggle, settoggle] = useState(false)
    var fullname = login.Fullname;
    const history = useHistory();
    let numberProductInCart = login.numberProductInCart;
    const typingTimeoutref = useRef(null)

    useEffect(() => {
           login.LoginDispatch();
    }, [login])
   
    useEffect(() => {
        login.countNumberInCart()
    }, []);

    function handleOnchangeSearch(value) {
        setsearchStr(value)
        if(typingTimeoutref.current){
            clearTimeout(typingTimeoutref.current);
        }
        typingTimeoutref.current = setTimeout(() => {
            Api.get(`client/product?search=${value}`).then((response)=> {
                settoggle(true)
                setlistSearch(response.data.content);
                console.log(response.data.content);
            }).catch((error) =>{
            });
            
        } , 300)
    }
    
    const LogoutHandle = () =>{
        login.LogoutDispatch();
    }
    const ChangeToMyAccount = () => {
        history.push("/myaccount");
    }

    function search() {
        settoggle(false)
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
        <div onClick={()=> settoggle(false)}>
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
                                                    <Link to="/login" className="dropdown-item color">Login</Link>
                                                    <Link to="/register" className="dropdown-item color">Register</Link>
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
                                <Link to="/">
                                    <img src={logo} alt="Logo"></img>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="search">
                                <input type="text" placeholder="Search" 
                                    // onChange={e=>{setsearchStr(e.target.value)}} value={searchStr}></input>
                                    onChange={e=> handleOnchangeSearch(e.target.value)} value={searchStr}></input>
                                <button><i className="fa fa-search" onClick={search}></i></button>
                            </div>
                            <ul >
                                    {
                                        (listSearch && toggle) && listSearch.map((p)=>(
                                            <li onClick = {() => {setsearchStr(p.name)
                                            settoggle(false)}}>{p.name}</li>
                                        ))
                                    }
                                </ul>
                        </div>
                        <div className="col-md-3">
                            <div className="user">
                                <Link to="/cart" className="btn cart">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span>({numberProductInCart})</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Header
