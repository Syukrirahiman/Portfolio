import React from 'react';
import { Link } from 'react-router-dom';
import "./VideoBanner.css"

class VideoBanner extends React.Component {

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
            margin: "20px auto",
            padding: "10px",
            // textShadow: "1.5px 1.5px #4d4d4d",
            // textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
            backgroundColor: "rgb(0,0,0,0.4)",
            width: "50%",
            // textAlign
        }

        return (
            <div className="containerV">


                <video width="770" autoPlay muted loop id="myVideo">
                    <source src={require("./video/discuss.mp4")} type="video/mp4" />
                </video>


                <div className="content">
                    <img
                        className="d-block mx-auto"
                        src={require("./img/popcorn.png")}
                        alt="First slide"
                        height= "130"
                        width ="130"
                        style={{marginBottom: "20px"}}

                    />
                    <Link to={{
                        pathname: "/plan",
                    }} >
                        <button type="button" className="btn btn-danger">Plan to Meet</button>
                    </Link>
                    <h5 style={font}>Plan with your friends to find the common showtime to watch now</h5>
                </div>



            </div>

        )

    }

}



export default VideoBanner;