import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Markup } from 'interweave';
import API from '../Config/Api'
import Pagination from '../Pagination/index'
import queryString from 'query-string'
    const imgStyle = {
        border: '2px solid #fff',
        borderRadius: '8px',
        width: '100px',
        display: 'inline'
    };
    const divStyle = {
        marginBottom: '20px',
        border: '2px solid #fff',
        borderRadius: '8px',
        width: '100%',
        height: "180px",
        boxShadow: "0 1px 10px rgb(0 0 0 / 50%)"
        
    };
    const divImageStyle = {
        float: 'left',
        marginRight : '20px' 
    }


export default function Post() {

    const [post, setPost] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })

    const [filters, setFilters] = useState({
        page: 0,
        category_edit_id: 0
    })

    useEffect(() => {
        const paramsString = queryString.stringify(filters)
        const requestUrl = `client/post?${paramsString}`
        API.get(requestUrl).then((response)=> {
            console.log(response.data.content)
            setPost(response.data.content);
            setPagination({
                page: response.data.pageIndex,
                totalPages: response.data.totalPage
            })
        }).catch((error) =>{
        });
    }, [filters])

    function handlePageChange(newPage) { 
        setFilters({
            page: newPage
        })
    }
    return (
        <div> 
            <div class="breadcrumb-wrap">
                <div class="container-fluid">
                    <ul class="breadcrumb">
                        <Link to="/"  class="breadcrumb-item">Home</Link>
                        <Link to="/post"  class="breadcrumb-item">Posts List</Link>
                    </ul>
                </div>
            </div>
            <div class="my-account">
                <div class="container-fluid">  
                    <div class="row" >    
                        <div class="col-md-12" >                        
                            {post.map( (post) => (                                   
                                <div class="tab-content" style={divStyle}>
                                        <div className="img" style={divImageStyle}>
                                            <a href="#"><img style={imgStyle} src={post.link} alt="Image"></img></a>
                                        </div>
                                        <Link to={`/post-detail/${post.id}`}>
                                            {post.title}                                            
                                        </Link>
                                        <div className="synopsis-content"><Markup className="synopsis-content" content={post.content}/></div>
                                </div>                                                                 
                            ))} 
                            </div>                              
                        </div>     
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                         />             
                  </div>
            </div>
        </div>
    )
}
