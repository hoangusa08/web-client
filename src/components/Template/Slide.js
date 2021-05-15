import React from 'react'
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
export default function Slide() {
    return (
        <div className="header">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <div className="header-img">
                        <div className="img-item">
                            <img src="img/category-8.jpg"/>
                        </div>
                        <div className="img-item">
                            <img src="img/category-3.jpg" />
                        </div>
                        <Link  to={{
                                        pathname: '/products',
                                        state: {
                                            check: 0, 
                                            id : 0
                                        }
                                        }}className="img-text" href="">
                            <p>Shopping Now</p>
                        </Link>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="header-slider normal-slider">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="img/slider-1.jpg"
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="img/slider-2.jpg"
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                className="d-block w-100"
                                src="img/slider-3.jpg"
                                alt="First slide"
                                />
                                <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                         </Carousel>
                        </div>
                </div>
                <div className="col-md-3">
                    <div className="header-img">
                        <div className="img-item">
                            <img src="img/category-1.jpg" />
                        </div>
                        <div className="img-item">
                            <img src="img/category-2.jpg" />
                        </div>
                        <Link  to={{
                                        pathname: '/products',
                                        state: {
                                            check: 0, 
                                            id : 0
                                        }
                                        }}className="img-text" href="">
                            <p>Shopping Now</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
