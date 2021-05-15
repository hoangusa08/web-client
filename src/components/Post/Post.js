import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import API from '../Config/Api'
    const imgStyle = {
        border: '2px solid red',
        borderRadius: '8px',
        width: '100px',
        display: 'inline'
    };
    const divStyle = {
        marginBottom: '20px',
        border: '2px solid red',
        borderRadius: '8px',
        width: '100%',
        height: "150px"
    };
    const divImageStyle = {
        float: 'left',
        marginRight : '20px' 
    }

export default function Post() {
    const [post, setPost] = useState([]);
    useEffect(() => {
        API.get('client/post').then((response)=> {
            console.log(response.data.content)
            setPost(response.data.content);
        }).catch((error) =>{
        });
    }, [])
    return (
        <div>
            <div class="breadcrumb-wrap">
                <div class="container-fluid">
                    <ul class="breadcrumb">
                        <Link to="/"  class="breadcrumb-item">Home</Link>
                        <Link to="/products"  class="breadcrumb-item">Posts</Link>
                        <li class="breadcrumb-item active">Post List</li>
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
                                            {post.name}                                            
                                        </Link>
                                        <p>{post.content}</p>
                                
                                </div>                                                                 
                            ))} 
                            </div>                              
                        </div>                
                  </div>
            </div>
        </div>
    )
}
