
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import API from '../Config/Api'
function PostDetail() {
    const [post, setPost] = useState({});
    const history=useHistory();
    useEffect(() => {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        console.log(token)
        const id = history.location.pathname.split("/")[2];
        API.get(`client/post/${id}`, token).then((response)=> {
            console.log(response.data)
            setPost(response.data);
        }).catch((error) =>{
        });

    }, [])

    return (
        <div className="my-account">
            <div className="container-fluid">
                <div className="row">
                    {/* <div className="col-md-3">
                        <div className="nav flex-column nav-pills" role="tablist" aria-orientation="vertical">
                            <a className="nav-link active" id="dashboard-nav" data-toggle="pill" href="#dashboard-tab" role="tab"><i className="fa fa-tachometer-alt"></i>Home</a>
                            <a className="nav-link" id="orders-nav" data-toggle="pill" href="#orders-tab" role="tab"><i className="fa fa-shopping-bag"></i>Product</a>
                            <a className="nav-link" id="payment-nav" data-toggle="pill" href="#payment-tab" role="tab"><i className="fa fa-credit-card"></i>Cart</a>
                            <a className="nav-link" id="address-nav" data-toggle="pill" href="#address-tab" role="tab"><i className="fa fa-map-marker-alt"></i>Contact</a>
                            <a className="nav-link" id="account-nav" data-toggle="pill" href="#account-tab" role="tab"><i className="fa fa-user"></i>List Post</a>
                        </div>
                    </div> */}
                    <div className="col-md-12">
                        <div className="tab-content">
                            <div className="tab-pane fade show active" id="dashboard-tab" role="tabpanel" aria-labelledby="dashboard-nav">
                                <h4>{post.title}</h4>
                                {unescape(post.content)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}


export default PostDetail