import Api from '../Config/Api';
import React, {useEffect, useState} from 'react'
import Card from './Card';
import {Link} from 'react-router-dom'
function Products(props) {
    const [listProduct , setlistProduct] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const [filter , setfilter] = useState({
        check  : props.location.state.check, 
        id  : props.location.state.id,
        search : props.location.state.search
    });
    const [pageIndex, setpageIndex] = useState(0)
    const [totalPage, settotalPage] = useState(0)
    const [searchInput, setsearchInput] = useState( props.location.state.search);
    var cout = 0
    useEffect(() => {
        console.log(filter)
        async function get() {
            switch (filter.check) {
                case 0:
                    Api.get('client/product').then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 1:
                    Api.get(`client/category/relateProduct/${filter.id}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 2:
                    Api.get(`client/brand/relateProduct/${filter.id}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 7:
                    console.log(pageIndex)
                    let id = pageIndex-1;
                    Api.get(`client/product?page=${id}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 8 :
                    let id8 = pageIndex+1;
                    Api.get(`client/product?page=${id8}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 9 :
                    Api.get(`client/product?search=${searchInput}`).then((response)=> {
                        setlistProduct(response.data.content);
                        console.log(response.data.content)
                    }).catch((error) =>{
                    });
                    break;
                default:
                    break;
            }
         }
        get()
    }, [filter]);
    useEffect(() => {
        async function getCategoryAndBrand() {
            Api.get('client/category/all').then((response)=> {
                setlistCategory(response.data);
            }).catch((error) =>{
            });
            Api.get('client/brand/all').then((response)=> {
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
                                </div>
                            </div>
                            {listProduct.map((product) => (
                                <Card product={product} key={cout++}></Card>
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
                        
                        <div className="sidebar-widget tag">
                            <h2 className="title">Tags Cloud</h2>
                            <a href="a">Lorem ipsum</a>
                            <a href="b">Vivamus</a>
                            <a href="c">Phasellus</a>
                            <a href="d">pulvinar</a>
                            <a href="e">Curabitur</a>
                            <a href="f">Fusce</a>
                            <a href="g">Sem quis</a>
                            <a href="h">Mollis metus</a>
                            <a href="i">Sit amet</a>
                            <a href="k">Vel posuere</a>
                            <a href="l">orci luctus</a>
                            <a href="m">Nam lorem</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Products
