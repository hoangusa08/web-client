import Api from '../Config/Api';
import React, { useState } from 'react'
import { useEffect } from 'react';
import Carousel from 'react-elastic-carousel';
import reviewImage from './image/review-4.jpg'
import { Markup } from 'interweave';
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 768, itemsToShow: 2 },
  ];
  
export default function ReviewInHome() {
    const [state, setstate] = useState([]);
    useEffect(() => {
        Api.get('client/review/good').then((response)=> {
            setstate(response.data.content);
        }).catch((error) =>{
        })
    }, [])
    return (
        <div className="review">
            <div className="container-fluid">
                <div className="row align-items-center review-slider normal-slider">
                    <Carousel breakPoints={breakPoints}>
                        {state.map((review) => (
                            <div className="review-slider-item" key={review.id}>
                                <div className="review-img">
                                    <img src={reviewImage} alt="Image"></img>
                                </div>
                                <div className="review-text">
                                    <h2>{review.name_User}</h2>
                                    <h3>{review.name_Product}</h3>
                                    <div className="ratting">
                                        <i className={review.number_Of_Star >=1 ?"fa fa-star": review.number_Of_Star >= 0.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                        <i className={review.number_Of_Star >=2 ?"fa fa-star": review.number_Of_Star >= 1.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                        <i className={review.number_Of_Star >=3 ?"fa fa-star": review.number_Of_Star >= 2.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                        <i className={review.number_Of_Star >=4 ?"fa fa-star": review.number_Of_Star >= 3.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                        <i className={review.number_Of_Star >=5 ?"fa fa-star": review.number_Of_Star >= 4.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                        <i>({review.number_Of_Star} Star)</i>
                                    </div>
                                    <p>
                                        <Markup content={review.content} />
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}
