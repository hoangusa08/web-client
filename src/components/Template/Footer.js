import React from 'react'

function Footer() {
    return (
        <div>
             <div className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget">
                                <h2>Get in Touch</h2>
                                <div className="contact-info">
                                    <p><i className="fa fa-map-marker"></i>58,Nguyễn Lương Bằng, Đà Nẵng</p>
                                    <p><i className="fa fa-envelope"></i>EstoreOffice@gmail.com</p>
                                    <p><i className="fa fa-phone"></i>0339905697</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget">
                                <h2>Follow Us</h2>
                                <div className="contact-info">
                                    <div className="social">
                                        <a href="https://www.facebook.com/chien.le.52090008"><i className="fab fa-twitter"></i></a>
                                        <a href="https://www.facebook.com/vietthanh1999"><i className="fab fa-facebook-f"></i></a>
                                        <a href="https://www.facebook.com/van.hoang.99er/"><i className="fab fa-linkedin-in"></i></a>
                                        <a href="https://www.facebook.com/lvc150599"><i className="fab fa-instagram"></i></a>
                                        <a href="https://www.facebook.com/quangnhan.nguyen.771"><i className="fab fa-youtube"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget">
                                <h2>Company Info</h2>
                                <ul>
                                    <li><a href="abc">About Us</a></li>
                                    <li><a href="abc">Privacy Policy</a></li>
                                    <li><a href="abc">Terms Condition</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="footer-widget">
                                <h2>Purchase Info</h2>
                                <ul>
                                    <li><a href="abc">Pyament Policy</a></li>
                                    <li><a href="a">Shipping Policy</a></li>
                                    <li><a href="a">Return Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row payment align-items-center">
                        <div className="col-md-6">
                            <div className="payment-method">
                                <h2>We Accept:</h2>
                                <img src="img/payment-method.png" alt="Payment Method" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="payment-security">
                                <h2>Secured By:</h2>
                                <img src="img/godaddy.svg" alt="Payment Security" />
                                <img src="img/norton.svg" alt="Payment Security" />
                                <img src="img/ssl.svg" alt="Payment Security" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
    )
}
export default Footer
