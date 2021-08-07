import Api from '../Config/Api';
import React, {useEffect, useState} from 'react'
import Card from './Card';
import {Link} from 'react-router-dom'
function Products(props) {
    const [listProduct , setlistProduct] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const [filter , setfilter] = useState({
        check  : props.location.state ? props.location.state.check : 0 , 
        id  : props.location.state ? props.location.state.id : 0 ,
        search : props.location.state ? props.location.state.search : ""
    });
    const [pageIndex, setpageIndex] = useState(0)
    const [totalPage, settotalPage] = useState(0)
    const [searchInput, setsearchInput] = useState( props.location.state ? props.location.state.search : "");
    const [star, setstar] = useState([])
    useEffect(() => {
        async function get() {
            switch (filter.check) {
                case 0 : //mặc định
                    await Api.get('client/product').then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    await Api.get('client/product/star').then((response)=> {
                        setstar(response.data.content);
                    }).catch((error) =>{
                    });
                    break;
                case 1: //get product by category
                    await Api.get(`client/category/relateProduct/${filter.id}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 2: // get product by brand
                    await Api.get(`client/brand/relateProduct/${filter.id}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 7: // previous
                    let id = pageIndex-1;
                    await Api.get(`client/product?page=${id}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    await Api.get(`client/product/star?page=${id}`).then((response)=> {
                        setstar(response.data.content);
                    }).catch((error) =>{
                    });
                    break;
                case 8 : //next
                    let id8 = pageIndex+1;
                    await Api.get(`client/product?page=${id8}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    await Api.get(`client/product/star?page=${id8}`).then((response)=> {
                        setstar(response.data.content);
                    }).catch((error) =>{
                    });
                    break;
                case 9 : // search
                    await Api.get(`client/product?search=${searchInput}`).then((response)=> {
                        setlistProduct(response.data.content);
                    }).catch((error) =>{
                    });
                    break;
                default:
                    break;
            }
         }
        get()
    }, [filter,searchInput,pageIndex]);
    useEffect(() => {
        async function getCategoryAndBrand() {
            await Api.get('client/category/all').then((response)=> {
                setlistCategory(response.data);
            }).catch((error) =>{
            });
            await Api.get('client/brand/all').then((response)=> {
                setlistBrand(response.data);
            }).catch((error) =>{
            });
        }
        getCategoryAndBrand();
    }, []);
    function SortName (c) {
        switch (c) {
            case 3:
                listProduct.sort((a, b) => (a.name > b.name) ? 1 : -1);
                break;
            case 4:
                listProduct.sort((a, b) => (a.name < b.name) ? 1 : -1);
                break;
            case 5:
                listProduct.sort((a, b) => (a.price > b.price) ? 1 : -1);
                break;
            default:
                listProduct.sort((a, b) => (a.price < b.price) ? 1 : -1);
                break;
        }
        setfilter({
            ...filter, check : c
        });
    }
    function buttonPrev(c) {
        setfilter({
            ...filter, check : c
        });
    }
    function buttonNext(c) {
        setfilter({
            ...filter, check : c
        });
    }
    function search(c) {
        setfilter({
            ...filter, check : c , search : searchInput
        });
    }
    return (
        <div>
            <div className="breadcrumb-wrap">
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <Link to="/"  className="breadcrumb-item">Home</Link>
                        <Link to="/products"  className="breadcrumb-item">Products</Link>
                        <li className="breadcrumb-item active">Product List</li>
                    </ul>
                </div>
            </div>
        <div className="product-view">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="product-view-top">
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="product-search">
                                                <input type="input"  onChange={e => setsearchInput(e.target.value)}value={searchInput}></input>
                                                <button><i className="fa fa-search" onClick={search.bind(this,9)}></i></button>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="product-short">
                                                <div className="dropdown">
                                                    <button className="dropdown-toggle">Product short by</button>
                                                        <div className="dropdown-content">
                                                        <button onClick={SortName.bind(this,3)}>Name (A-Z)</button>
                                                        <button onClick={SortName.bind(this,4)}>Name (Z-A)</button>
                                                        <button onClick={SortName.bind(this,5)}>Price (Low to High)</button>                                                        
                                                        <button onClick={SortName.bind(this,6)}>Price (High to low)</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                { (listProduct.length === 0) && ( <div className="row">
                                                                    <div className="col-md-6"></div>
                                                                    <p className="col-md-6" style={{color: "red",marginTop :"20px"}}>No results</p>
                                                                    </div>)
                                        }
                                </div>
                            </div>
                            {listProduct.map((product) => (
                                <Card product={product} key={product.id} star={star}></Card>
                            ))} 
                          
                        </div>
                        
                        <div className="col-md-12">
                            <nav aria-label="Page navigation example">
                                <ul className="pagination justify-content-center">
                                    <li className="page-item">
                                        <button className="page-link"  disabled={pageIndex === 0 } onClick={buttonPrev.bind(this,7)}>Prev</button>
                                    </li>
                                    <li className="page-item">
                                        <button className="page-link" disabled={pageIndex === totalPage-1} onClick={buttonNext.bind(this,8)}>Next</button>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>           
                    
                    <div className="col-lg-4 sidebar">
                        <div className="sidebar-widget category">
                            <h2 className="title">Category</h2>
                            <nav className="navbar bg-light">
                                <ul className="navbar-nav">
                                {listCategory.map((category) => (
                                     <li className="nav-item" key={category.id}>
                                        <button className="nav-link" onClick={() => (setfilter({check : 1 ,id: category.id }))}>{category.name}</button>
                                    </li>
                                ))} 
                                </ul>
                            </nav>
                        </div>
                        
                        <div className="sidebar-widget brands">
                            <h2 className="title">Brands</h2>
                            <ul>
                                {listBrand.map((brand) => (
                                    <li className="nav-item"  key={brand.id}>
                                        <button className="nav-link" onClick={() => (setfilter({check : 2 ,id: brand.id }))}>{brand.name}</button>
                                    </li>
                                ))} 
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Products
