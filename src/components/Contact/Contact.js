import React from 'react'

function Contact() {
    return (
         <div className="contact">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="contact-info">
                            <h2>Our Office</h2>
                            <h3><i className="fa fa-map-marker"></i>58, Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</h3>
                            <h3><i className="fa fa-envelope"></i>EstoreOffice@gmail.com</h3>
                            <h3><i className="fa fa-phone"></i>0339905697</h3>
                            <div className="social">
                                <a href="https://www.facebook.com/chien.le.52090008"><i className="fab fa-twitter"></i></a>
                                <a href="https://www.facebook.com/vietthanh1999"><i className="fab fa-facebook-f"></i></a>
                                <a href="https://www.facebook.com/van.hoang.99er/"><i className="fab fa-linkedin-in"></i></a>
                                <a href="https://www.facebook.com/lvc150599"><i className="fab fa-instagram"></i></a>
                                <a href="https://www.facebook.com/quangnhan.nguyen.771"><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="contact-info">
                            <h2>Our Store</h2>
                            <h3><i className="fa fa-map-marker"></i>58, Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng</h3>
                            <h3><i className="fa fa-envelope"></i>Estore@gmail.com</h3>
                            <h3><i className="fa fa-phone"></i>0339905697</h3>
                            <div className="social">
                                    <a href="https://www.facebook.com/chien.le.52090008"><i className="fab fa-twitter"></i></a>
                                    <a href="https://www.facebook.com/vietthanh1999"><i className="fab fa-facebook-f"></i></a>
                                    <a href="https://www.facebook.com/van.hoang.99er/"><i className="fab fa-linkedin-in"></i></a>
                                    <a href="https://www.facebook.com/lvc150599"><i className="fab fa-instagram"></i></a>
                                    <a href="https://www.facebook.com/quangnhan.nguyen.771"><i className="fab fa-youtube"></i></a>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="contact-form">
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <input type="text" className="form-control" placeholder="Your Name" />
                                    </div>
                                    <div className="col-md-6">
                                        <input type="email" className="form-control" placeholder="Your Email" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Subject" />
                                </div>
                                <div className="form-group">
                                    <textarea className="form-control" rows="5" placeholder="Message"></textarea>
                                </div>
                                <div><button className="btn" type="submit">Send Message</button></div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="contact-map">
                           
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8338458060866!2d108.14767365069093!3d16.074109688823363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218d6915ae09d%3A0xecb3afdb4ead6f32!2zNTggTmd1eeG7hW4gTMawxqFuZyBC4bqxbmcsIEhvw6AgS2jDoW5oIELhuq9jLCBMacOqbiBDaGnhu4N1LCDEkMOgIE7hurVuZyA1NTAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1618234894093!5m2!1svi!2s"frameBorder="0"allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact
