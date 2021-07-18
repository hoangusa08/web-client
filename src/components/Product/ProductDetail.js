import React, { useContext, useEffect , useState } from 'react'
import { useHistory } from 'react-router';
import Card from './Card';
import Carousel from 'react-elastic-carousel';
import {LoginContext} from '../../context/LoginContext'
import { Markup } from 'interweave';
import Api from '../Config/Api'
import { Link } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1600, itemsToShow: 4 }
  ];
function ProductDetail() {
    const Login = useContext(LoginContext);
    const history=useHistory();
    const [color , setcolor] =useState([]);
    const [Product , setProduct] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const [filter , setfilter] = useState({
        check  : 0, 
        id  : 0,
        size : "",
        review : ""
    });
    const [colorSizeM , setcolorSizeM] = useState("")
    const [colorSizeL , setcolorSizeL] = useState("");
    const [colorSizeXL , setcolorSizeXL] = useState("")
    const [colorSizeXXL , setcolorSizeXXL] = useState("")
    const [brandRelated, setbrandRelated] = useState([]);
    // const [cateRelated, setcateRelated] = useState([])
    const [quantity, setQuantity] = useState(1);
    const addToCart = (e) => {
        console.log(e.target)
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        let id = e.target.id.toString();
        
        cart[id] = (cart[id] ? cart[id]: 0);
        
        let qty = cart[id] + parseInt(quantity);
        cart[id] = qty
        localStorage.setItem('cart', JSON.stringify(cart));
        Login.countNumberInCart()
    }
    const addQty= (e) => {
        e.preventDefault();
        setQuantity(parseInt(quantity) + 1)
        
    }

    const removeQty = (e) => {
        e.preventDefault();
        if(quantity > 1)
            setQuantity(parseInt(quantity) - 1)    
    }
    const [cateRelated, setcateRelated] = useState([]);
    const [review, setreview] = useState([]);
    const [OutputReview, setOutputReview] = useState({
        id_user : 0,
        id_product : 0,
        content : "",
        number_of_star : 0
    })
    useEffect(() => {
        if (filter.check === 0){
                colorinsize(filter.size);
            }
    }, [filter]);
    useEffect(() => {
        const id = history.location.pathname.split("/")[2];
        Api.get(`client/product/${id}`).then((response)=> {
            setProduct(response.data);
            console.log(response.data)
            setcolorSizeM(response.data.m);
            setcolorSizeL(response.data.l);
            setcolorSizeXL(response.data.xl);
            setcolorSizeXXL(response.data.xxl);
            Api.get(`client/brand/relateProduct/${response.data.id_brand}`).then((response)=> {
                setbrandRelated(response.data.content);
            }).catch((error) =>{
            });
            Api.get(`client/category/relateProduct/${response.data.id_cate}`).then((response)=> {
                setcateRelated(response.data.content);
            }).catch((error) =>{
            });
        }).catch((error) =>{
        });
        Api.get(`client/review/${id}`).then((response)=> {
                setreview(response.data.content);
            }).catch((error) =>{
            });
        Api.get('client/category/all').then((response)=> {
            setlistCategory(response.data);
        }).catch((error) =>{
        });
        Api.get('client/brand/all').then((response)=> {
            setlistBrand(response.data);
        }).catch((error) =>{
        });
    }, [filter.review]);
    const colorinsize = (size) => {
        switch(size) {
            case "m":
                let colorofsizem = colorSizeM.split(" ");
                colorofsizem.pop();
                setcolor(colorofsizem);
              break;
            case "l":
                let colorofsizel = colorSizeL.split(" ");
                colorofsizel.pop();
                setcolor(colorofsizel);
              break;
            case "xl":
                let colorofsizexl = colorSizeXL.split(" ");
                colorofsizexl.pop();
                setcolor(colorofsizexl);
                break;
            case "xxl":
                let colorofsizexxl = colorSizeXXL.split(" ");
                colorofsizexxl.pop();
                setcolor(colorofsizexxl);
              break;
            default:
        }
    }
    function submitReview() { 
        if (Login.IsLogin === true) {
            Api.post(`client/review`, OutputReview).then((response)=> {
                //alert(response.data.message);
                setfilter({...filter , review : OutputReview.content})
            }).catch((error) =>{
                console.log(error);
            });
        } else {
            history.push("/login")
        }
    }
    return (
        <div className="product-detail">
            <div className="container-fluid">
                <div className="row">
                        <div className="col-lg-8">
                            <div className="product-detail-top">
                                <div className="row align-items-center">
                                    <div className="col-md-5">
                                        <div className="product-slider-single-nav normal-slider">
                                            <div className="slider-nav-img"><img src={Product.link} alt={Product.iamgeName}></img></div>
                                        
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="product-content">
                                            <div className="title"><h2>{Product.name}</h2></div>
                                            <div className="ratting">
                                                <i className={Product.number_of_star >=1 ?"fa fa-star": Product.number_of_star >= 0.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_of_star >=2 ?"fa fa-star": Product.number_of_star >= 1.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_of_star >=3 ?"fa fa-star": Product.number_of_star >= 2.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_of_star >=4 ?"fa fa-star": Product.number_of_star >= 3.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_of_star >=5 ?"fa fa-star": Product.number_of_star >= 4.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                            </div>
                                            <div className="price">
                                                <h4>Price:</h4>
                                                <p>{Product.price+" "} VND</p>
                                            </div>
                                            <div className="quantity">
                                                <h4>Quantity:</h4>
                                                <div className="qty">
                                                    <button className="btn-minus" onClick={removeQty}><i className="fa fa-minus"></i></button>
                                                    <input type="text" onChange = {e => setQuantity(e.target.value)} value={quantity}></input>
                                                    <button className="btn-plus" onClick={addQty}><i className="fa fa-plus"></i></button>
                                                </div>
                                            </div>
                                            <div className="p-size">
                                                <h4>Size:</h4>
                                                <div className="btn-group btn-group-sm">
                                                    <button type="button" className="btn" 
                                                    onClick={e => {setfilter({...filter , check : 0 , size : "m" })}}>M</button>
                                                    <button type="button" className="btn" 
                                                    onClick={e => {setfilter({...filter , check : 0 , size : "l" })}}>L</button>
                                                    <button type="button" className="btn"
                                                    onClick={e => {setfilter({...filter , check : 0 , size : "xl" })}}>XL</button>
                                                    <button type="button" className="btn" 
                                                    onClick={e => {setfilter({...filter , check : 0 , size : "xxl" })}}>XXL</button>
                                                </div> 
                                            </div>
                                            <div className="p-color">
                                                <h4>Color:</h4>
                                                <div className="btn-group btn-group-sm">
                                                    {color.map((color) => (
                                                        <button type="button" className="btn" key={color.id}>{color}</button>
                                                    ))}
                                                </div> 
                                            </div>
                                            <div className="action">
                                                <a className="btn" id={Product.id} onClick={addToCart}><i className="fa fa-shopping-cart" ></i>Add to Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="row product-detail-bottom">
                                <div className="col-lg-12">
                                    <ul className="nav nav-pills nav-justified">
                                        <li className="nav-item">
                                            <h3>Description</h3>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div id="description" className="container tab-pane active">
                                        <   Markup content={Product.des} />           
                                        </div>
                                    </div>
                                    <ul className="nav nav-pills nav-justified">
                                        <li className="nav-item">
                                            <h3>Reviews ({review.length})</h3>
                                        </li>
                                    </ul>
                                    <div id="reviews" className="container tab-pane active">
                                            {review.map((review) => (
                                                <div className="reviews-submitted" key={review.id}>
                                                    <div className="reviewer">{review.name_User}</div>
                                                    <div>Date: {review.timeReview}</div>
                                                    <div className="ratting">
                                                        <i className={review.number_Of_Star >=1 ?"fa fa-star": review.number_Of_Star >= 0.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                        <i className={review.number_Of_Star >=2 ?"fa fa-star": review.number_Of_Star >= 1.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                        <i className={review.number_Of_Star >=3 ?"fa fa-star": review.number_Of_Star >= 2.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                        <i className={review.number_Of_Star >=4 ?"fa fa-star": review.number_Of_Star >= 3.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                        <i className={review.number_Of_Star >=5 ?"fa fa-star": review.number_Of_Star >= 4.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                    </div>
                                                    <p>
                                                    <Markup content={review.content} />
                                                    </p>
                                                </div>
                                            ))}
                                            <div className="reviews-submit">
                                                <h4>Give your Review:</h4>
                                                <div className="ratting">
                                                    <button className={OutputReview.number_of_star >=1 ? "fa fa-star" : "far fa-star"} onClick={ e => {setOutputReview({...OutputReview , number_of_star : 1})}}></button>
                                                    <button className={OutputReview.number_of_star >=2 ? "fa fa-star" : "far fa-star"} onClick={ e => {setOutputReview({...OutputReview , number_of_star : 2})}}></button>
                                                    <button className={OutputReview.number_of_star >=3 ? "fa fa-star" : "far fa-star"} onClick={ e => {setOutputReview({...OutputReview , number_of_star : 3})}}></button>
                                                    <button className={OutputReview.number_of_star >=4 ? "fa fa-star" : "far fa-star"} onClick={ e => {setOutputReview({...OutputReview , number_of_star : 4})}}></button>
                                                    <button className={OutputReview.number_of_star >=5 ? "fa fa-star" : "far fa-star"} onClick={ e => {setOutputReview({...OutputReview , number_of_star : 5})}}></button>
                                                </div>
                                            </div>
                                            <div className="row form">
                                                <label>Review :</label>
                                                <div  className="col-sm-12">
                                                <CKEditor
                                                    editor={ ClassicEditor }
                                                    data={OutputReview.content}
                                                    onChange={ ( event, editor ) => {
                                                        setOutputReview({...OutputReview ,content :editor.getData(),
                                                                                        id_user : localStorage.getItem("id") ,
                                                                                        id_product : Product.id})
                                                    } }
                                                />
                                                <button className="submit" onClick={submitReview}>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                            </div>
                            
                            <div className="featured-product product">
                                <div className="section-header">
                                    <h1>Related Products (brand)</h1>
                                </div>
                                <div className="row align-items-center product-slider product-slider-4">
                                    <Carousel breakPoints={breakPoints}>
                                        {brandRelated.map((product) => (
                                                <Card product={product} key={product.id} star={[]}></Card>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                    </div>
                    <div className="col-lg-4 sidebar">
                        <div className="sidebar-widget category">
                            <h2 className="title">Category</h2>
                            <nav className="navbar bg-light">
                                <ul className="navbar-nav">
                                    {listCategory.map((category) => (
                                        <li className="nav-item" key={category.id}>
                                            <Link className="nav-link"  to={{
                                                pathname: '/products',
                                                state: {
                                                    check: 1, 
                                                    id : category.id
                                                }
                                                }}>{category.name}</Link>
                                            </li>
                                        ))} 
                                </ul>
                            </nav>
                        </div>
                        <div className="sidebar-widget widget-slider">
                            <div className="sidebar-slider normal-slider">
                                <h2 className="title">Related Products (Category)</h2>
                                <Carousel breakPoints={breakPoints}>
                                    {cateRelated.map((product) => (
                                            <Card product={product} key={product.id} star={[]}></Card>
                                    ))}
                                </Carousel>
                            </div>
                        </div>
                        <div className="sidebar-widget brands">
                            <h2 className="title">Brands</h2>
                            <ul>
                                {listBrand.map((brand) => (
                                    <li className="nav-item" key={brand.id}>
                                        <Link className="nav-link" to={{
                                                pathname: '/products',
                                                state: {
                                                    check: 1, 
                                                    id : brand.id
                                                }
                                                }}>{brand.name}</Link>
                                    </li>
                                ))} 
                            </ul>
                        </div>
                        
                        <div className="sidebar-widget tag">
                            <h2 className="title">Tags Cloud</h2>
                            <a href="a">Lorem ipsum</a>
                            <a href="a">Vivamus</a>
                            <a href="a">Phasellus</a>
                            <a href="a">pulvinar</a>
                            <a href="a">Curabitur</a>
                            <a href="a">Fusce</a>
                            <a href="a">Sem quis</a>
                            <a href="a">Mollis metus</a>
                            <a href="a">Sit amet</a>
                            <a href="a">Vel posuere</a>
                            <a href="a">orci luctus</a>
                            <a href="a">Nam lorem</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
