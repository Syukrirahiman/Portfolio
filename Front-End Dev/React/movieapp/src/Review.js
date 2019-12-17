import React from 'react';
import axios from 'axios';
import { Table, Jumbotron, Container, Row, Col, Button } from 'react-bootstrap';
import { MDBCardImage } from "mdbreact";
import './Review.css'

class Review extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            review_result: '',
            movie_is_details: this.props.location.state.selected_movie,
            imdb_id: '',
            movie_omdb_details: {},
            apikeyIS: 'YOUR_API_KEY_HERE', //api key of international showtimes
            apikeyOMDB: 'YOUR_API_KEY_HERE',
            rating_result: '',
        };
        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log(this.state.movie_is_details)
        this.getIMDBId();
    }

    displayDetail() {
        const bold = {
            fontWeight: 'bold',
        };

        const center = {
            textAlign: 'center',
        };

        if (this.state.movie_omdb_details.Title) {


            return (

                <Jumbotron fluid>

                    <Container>
                        <Row>
                            <Col>


                                <MDBCardImage
                                    className="img-fluid pb-3 float-left"
                                    src={this.state.movie_omdb_details.Poster}
                                />

                            </Col>
                            <Col xs={7}>

                                <h1>{this.state.movie_omdb_details.Title}</h1>

                                <p><span style={bold}>Release date:</span>  {this.state.movie_omdb_details.Released}  </p>
                                {/* <p> <span style={bold}>Average Rating:</span>  {this.state.rating_result.avg_rating+"%"} </p> */}
                                <p> <span style={bold}>IMDB Rating:</span>  {this.state.movie_omdb_details.imdbRating} </p>
                                {/* <p> <span style={bold}>Metacritic Rating:</span>  {this.state.rating_result.metacritic_rating+"%"} </p>
                                <p> <span style={bold}>Rotten Tomato Rating:</span>  {this.state.rating_result.rotten_rating+"%"} </p> */}


                                <p> <span style={bold}>Runtime:</span>  {this.state.movie_omdb_details.Runtime} </p>
                                <p> <span style={bold}>Rated:</span>  {this.state.movie_omdb_details.Rated} </p>
                                <p> <span style={bold}>Genre:</span>  {this.state.movie_omdb_details.Genre} </p>
                                <p> <span style={bold}>Director:</span>  {this.state.movie_omdb_details.Director} </p>
                                <p> <span style={bold}>Production:</span>  {this.state.movie_omdb_details.Production} </p>
                                <p> <span style={bold}>Language:</span>  {this.state.movie_omdb_details.Language} </p>

                                <p><span style={bold}>Plot:</span> {this.state.movie_omdb_details.Plot}</p>


                            </Col>


                        </Row>

                    </Container>
                </Jumbotron>



            )
        }
    }

    displayResult() {

        const bold = {
            fontWeight: 'bold',
        };

        const center = {
            textAlign: 'center',
        };

        const borderReview = {
            // width: "150px",
            height: "200px",
            // lineHeight: "3em",
            overflow: "scroll",
            padding: "5px",
            border: "1px solid grey",
            borderRadius: "10px",

        }


        if (this.state.review_result.rawReviews) {

            var reviews = this.state.review_result.rawReviews;
            // return this.state.review_result.rawReviews[0].author;

            return (



                <Container style={{ marginBottom: "60px" }}>
                    <Row>
                        <Col >
                            <h2>Reviews</h2>

                        </Col>
                    </Row>
                    <br />
                    <Row>
                        <Col >
                            <p><span style={bold}>Total Reviews</span></p>


                            <p>{reviews.length}</p>
                        </Col>
                        <Col >
                            <p><span style={bold}>Sentiment Result</span></p>
                            <p>{this.state.review_result.sentiment_tag}</p>
                        </Col>

                    </Row>

                    <br />

                    {reviews.map((value, index) => (
                        <Row style={{ paddingTop: "10px" }}>
                            <Col >

                                <p><span style={bold}>{value.author}</span> </p>
                                {/* <p > {value.content} </p> */}
                                <div style={borderReview}> {value.content}</div>
                            </Col>
                        </Row>

                    ))}

                </Container>




            )

        } else if (this.state.review_result == 'notfound') {
            return (



                <Container style={{ marginBottom: "60px" }}>
                    <Row>
                        <Col >
                            <h2>Reviews</h2>

                        </Col>
                    </Row>
                    <br />



                    <Row style={{ paddingTop: "10px" }}>
                        <Col >

                            <p>No reviews at the moment. </p>

                        </Col>
                    </Row>



                </Container>




            )

        }

        else {
            return (



                <Container style={{ marginTop: "50px", marginBottom: "50px" }}>

                    <Row>
                        <Col >
                            {/* <h2>Reviews</h2> */}

                        </Col>
                    </Row>

                    <Row className="show-grid" >

                        <Col md={12} xOffset={6}>
                            <div className="loader"></div>

                        </Col>

                    </Row>


                </Container>





            )

        }
    }
    render() {

        // const test = this.getData;
        return (

            <div>
                {this.displayDetail()}
                {this.displayResult()}
                {console.log(this.state.review_result)}
                {/* <h1>{this.state.name}</h1> */}
            </div>

        )

    }

    getIMDBId() {
        var movie_id = this.state.movie_is_details.id;
        // console.log(movie_id);

        //in case api is down uncomment this (must chose terminator)

        // this.setState({
        //     imdb_id: "tt6450804",
        // }, () => {
        //     this.getReviewResult();
        // });

        // var data = require('./backupjson/omdbterminatordetails.json');

        // this.setState({
        //     movie_omdb_details: data,
        // }, () => {
        //     this.getAverageRating();
        // });




        //api method
        var xhr = new XMLHttpRequest();
        let urlmoviedetails = "https://api.internationalshowtimes.com/v4/movies/" + movie_id + "?fields=imdb_id&apikey=" + this.state.apikeyIS;

        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            var resp = JSON.parse(xhr.responseText);
            this.setState({
                imdb_id: resp.movie.imdb_id,
            }, () => {
                this.getReviewResult();
            });

            var xhr2 = new XMLHttpRequest()

            //get movie details from imdb
            let urlMovieDetails = "http://www.omdbapi.com/?i=" + this.state.imdb_id + "&apikey=" + this.state.apikeyOMDB;
            xhr2.addEventListener('load', () => {
                // update the state of the component with the result here


                var resp = JSON.parse(xhr2.responseText);
                this.setState({
                    movie_omdb_details: resp,
                }, () => {
                    this.getAverageRating();
                });

                console.log(this.state);
            })
            xhr2.open('GET', urlMovieDetails)
            xhr2.send()

        })
        xhr.open('GET', urlmoviedetails)
        xhr.send()
    }

    getAverageRating() {
        // var ratings = this.state.movie_omdb_details.Ratings;
        // console.log(ratings)

        // var imdbRating = this.state.movie_omdb_details.imdbRating * 10;
        // var rottenRating = ratings[1].Value.replace("%", "") * 1
        // var metacriticRating = this.state.movie_omdb_details.Metascore * 1;

        // var avgRating = (imdbRating + rottenRating + metacriticRating) / 3;

        // var ratings = {
        //     imdb_rating: imdbRating,
        //     rotten_rating: rottenRating,
        //     metacritic_rating: metacriticRating,
        //     avg_rating: avgRating,
        // }

        // this.setState({
        //     rating_result: ratings,
        // })

    }

    getReviewResult() {
        var imdb_id = this.state.imdb_id;
        console.log(imdb_id);
        var results = "nil";
        var that = this;
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log("yo")
                var dataObj = JSON.parse(this.responseText);
                console.log(dataObj);
                results = dataObj;
                that.setState({
                    review_result: results,
                })
            } else if (this.status == 500) {
                that.setState({
                    review_result: 'notfound',
                })
            }
        }
        request.open("GET", "http://localhost/Project/review.php?imdb_id=" + imdb_id, true);
        request.send();



    }

}

export default Review;