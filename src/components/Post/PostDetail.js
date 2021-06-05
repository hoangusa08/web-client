
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';
import API from '../Config/Api'
import { Markup } from 'interweave';
const imgStyle = {
    // border: '2px solid red',
    // borderRadius: '8px',

    width: '70%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto'
};
function PostDetail() {

    const [post, setPost] = useState({});
    const history=useHistory();
    useEffect(() => {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        console.log(token)
        const id = history.location.pathname.split("/")[2];
        API.get(`client/post/${id}`).then((response)=> {
            console.log(response.data[0])
            setPost(response.data[0]);
        }).catch((error) =>{
        });

    }, [])

    return (
        <div>
            <div className="breadcrumb-wrap">
                <div className="container-fluid">
                    <ul className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item"><a href="#">Post</a></li>
                        <li className="breadcrumb-item active">Post Detail</li>
                    </ul>
                </div>
            </div>
            <div className="my-account">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-10">
                            <div className="tab-content">
                                <div className="tab-pane fade show active" id="dashboard-tab" role="tabpanel" aria-labelledby="dashboard-nav">
                                    <div className="article-head">
                                        <h1>{post.title}</h1>
                                    </div>
                                    <div className="article-content">
                                        <div className="article-body">
                                            <div>
                                                <br/>
                                            </div>
                                            <div className="img" >
                                                {/* <a href="#"><img style={imgStyle} src={post.linkImage} alt="Image"></img></a> */}
                                            </div>
                                            <div>
                                                <br/>
                                            </div>
                                            <Markup className="synopsis-content" content={post.content}/>
                                    </div>
                                    </div>
    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

    )
}


export default PostDetail