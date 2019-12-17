import React from 'react';
import ReactDOM from 'react-dom';
import './Slider.css';
import Navbar from 'react-bootstrap/Navbar';
import { Carousel, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Slider extends React.Component {

    render() {

        const carouselitem = {
            width: "100%",
            height: 600,
            backgroundColor: "rgb(249, 249, 249)",
        };

        const centralize = {
            margin: "auto",
            width: "100%",
            // textAlign: 'center',
            paddingTop: "30px"
        };

        const font = {
            color: "black",
            paddingTop: "20px",
        }
    
        return (
            <div className="Slider">
                <Carousel>
                    <Carousel.Item style = {carouselitem}>
                        <div style ={centralize}>
                        <img
                            className="d-block mx-auto"
                            src={require("./img/firstbanner.jpg")}
                            alt="First slide"
                            style = {carouselitem}
                           
                        />
                        </div>
                        <Carousel.Caption>
                        <Link to={{
                                pathname: "/plan",
                            }} >
                                <button type="button" className="btn btn-danger">Plan to Meet</button>
                            </Link>
                            {/* <h3 style ={font}>Plan to meet</h3> */}
                            <p style ={font}>Plan with your friends to find the common showtime to watch now</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    {/* <Carousel.Item>
                        <img
                            className="d-block mx-auto"
                            src={require("./img/joker.jpeg")}
                            alt="First slide"
               
                            style = {carouselitem}
                        />

                        <Carousel.Caption>
                            <h3>Second slide label</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block mx-auto"
                            src={require("./img/joker.jpeg")}
                            alt="First slide"
                            style={carouselitem}
                        />
                        <Carousel.Caption>
                            <h3>Third slide label</h3>
                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                        </Carousel.Caption>
                    </Carousel.Item> */}
                </Carousel>
            </div>

        )

    }

}



export default Slider;