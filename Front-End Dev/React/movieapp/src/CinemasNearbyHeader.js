import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
import { Carousel, Button, Container, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./CinemasNearbyHeader.css"

class CinemasNearbyHeader extends React.Component {

    render() {

        const carouselitem = {
            width: "100%",
            height: 700,
            backgroundColor: "rgb(249, 249, 249)",
        };

        const centralize = {
            margin: "auto",
            width: "100%",
            // textAlign: 'center',
            paddingTop: "30px"
        };

        const bold = {
            fontWeight: "bold"
        }

        return (
            <div className="containerNB" style={{ height: "650px" }}>


                {/* <img
                    className="d-block mx-auto"
                    src={require("./img/cinemasnearby.jpg")}
                    alt="First slide"
                    id="myBackground"
                /> */}



                <div className="contentNB">

                    <Container>
                        <h2 >Discover Cinemas Nearby</h2>
                        <br></br>
                        <br></br>
                        <Row>
                            <Col>

                                <a href="https://www.gv.com.sg/#/">
                                    <img
                                        className="d-block mx-auto"
                                        src={require("./img/goldenvillage.png")}
                                        alt="First slide"
                                        height="90"
                                        width="270"
                                        style={{ marginBottom: "20px" }}
                                    />
                                </a>

                            </Col>

                            <Col>

                                <a href="https://www.cathaycineplexes.com.sg/">
                                    <img
                                        className="d-block mx-auto"
                                        src={require("./img/cathay.jpg")}
                                        alt="First slide"
                                            height="95"
                                            width="200"
                                        style={{ marginBottom: "20px" }}
                                    />
                                </a>

                            </Col>


                            <Col>

                                <a href="https://www.shaw.sg/">
                                    <img
                                        className="d-block mx-auto"
                                        src={require("./img/shaw.jpg")}
                                        alt="First slide"
                                        height="100"
                                        width="240"
                                        style={{ marginBottom: "20px" }}
                                    />
                                </a>

                            </Col>

                        </Row>


                        <Row>
                            <Col>

                                <a href="https://www.eaglewingscinematics.com.sg/browsing/">
                                    <img
                                        className="d-block mx-auto"
                                        src={require("./img/eaglewings.jpg")}
                                        alt="First slide"
                                        height="240"
                                        width="240"
                                        style={{ marginBottom: "20px" }}
                                    />
                                </a>

                            </Col>

                            <Col>

                                <a href="https://theprojector.sg/">
                                    <img
                                        className="d-block mx-auto"
                                        src={require("./img/theprojector.jpg")}
                                        alt="First slide"
                                        height="140"
                                        width="140"
                                        style={{ marginBottom: "20px", marginTop: "50px" }}
                                    />
                                </a>

                            </Col>


                            <Col>

                                <a href="https://www.wecinemas.com.sg/">
                                    <img
                                        className="d-block mx-auto"
                                        src={require("./img/we-logo.jpg")}
                                        alt="First slide"
                                        height="120"
                                        width="120"
                                        style={{ marginBottom: "20px", marginTop: "60px" }}
                                    />
                                </a>

                            </Col>

                        </Row>
                    </Container>

                    <Link to={{
                        pathname: "/cinemasnearby",
                    }} >
                        <button type="button" className="btn btn-outline-danger">Discover</button>
                    </Link>
                </div>



            </div>

        )

    }

}



export default CinemasNearbyHeader;