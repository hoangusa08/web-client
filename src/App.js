import './App.css';
import { BrowserRouter, Route, } from "react-router-dom";
import Header from "./components/Template/Header"
import Footer from "./components/Template/Footer"
import Login from "./components/Login/Login"
import Register from "./components/Login/Register"
import Contact from "./components/Contact/Contact"
import LoginContextProvider from './context/LoginContext'
import Cart from './components/Cart/Cart'
import Home from './components/Home/Home'
import ProductDetail from "./components/Product/ProductDetail"
import Products from './components/Product/Products';
import MyAccount from './components/MyAccount/MyAccount'
import Order from './components/MyAccount/Order/Orders'
import UpdateAccount from './components/MyAccount/UpdateAccount'
import Post from './components/Post/Post';
import Checkout from './components/Checkout/Checkout'
import PostDetail from './components/Post/PostDetail';
import ViewOrder from './components/MyAccount/Order/ViewOrder';

function App() {
  return (
    <div >
      <BrowserRouter>
        <LoginContextProvider>
          <Header/>
            <Route path='/' exact component={Home} /> 
            <Route path='/home' exact component={Home} /> 
            <Route path='/register' component={Register} /> 
            <Route path='/cart' component={Cart} /> 
            <Route path='/products' component={Products} />
            <Route path='/login' component={Login} />
            <Route path='/order' component={Order} />
            <Route path='/view-order/:id' component={ViewOrder} />

            <Route path='/updateaccount' component={UpdateAccount} />
            <Route path='/myaccount' component={MyAccount} />
            <Route path='/contact' component={Contact} /> 
            <Route path='/checkout' component={Checkout} />  
            <Route path='/productdetail/:id' component={ProductDetail} /> 
            
            <Route path='/post' component={Post} /> 
            <Route path='/post-detail/:id' component={PostDetail} /> 
          <Footer/>
          </LoginContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
