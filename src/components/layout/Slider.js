import React, { Component } from 'react';

class Sliderr extends Component {
    render() {
        return (

            <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleFade" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleFade" data-slide-to="1"></li>
                    <li data-target="#carouselExampleFade" data-slide-to="2"></li>
                    <li data-target="#carouselExampleFade" data-slide-to="3"></li>
                    <li data-target="#carouselExampleFade" data-slide-to="4"></li>
              </ol>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img className="d-block w-100" src="https://theme.hstatic.net/200000355547/1000958382/14/home_banner_flashsale.jpg?v=348" height={500} alt="First slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://d3design.vn/uploads/%C3%A9dfjh30.jpg" height={500} alt="Second slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://i.pinimg.com/originals/fa/45/96/fa4596ad9a9d39901eeb455ed4f74e44.jpg" height={500} alt="Third slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://thietke6d.com/wp-content/uploads/2021/05/banner-quang-cao-giay-4.webp" height={500} alt="Four slide" />
                    </div>
                    <div className="carousel-item">
                        <img className="d-block w-100" src="https://thietke6d.com/wp-content/uploads/2021/05/banner-quang-cao-giay-3.webp" height={500} alt="Four slide" />
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

export default Sliderr;