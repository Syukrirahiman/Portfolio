import React from 'react';
import './Slider.css';
import { Jumbotron, Col, Row, Container } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { MDBCardImage } from "mdbreact";

class RecommendMovies extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            apikeyIS: 'YOUR_API_KEY_HERE',
            apikeyOMDB: 'YOUR_API_KEY_HERE',
            movie_arr: [],
            redirect: false,
            selected_movie: '',
            top_rated_movies: [],
            current_omdb_details: '',
            toptreshhold: 6,
            clickMovie: '',
            redirectReview: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getData()
    }

    handleClick(movie) {

        console.log(movie);

        var movieIS = this.getISDetails(movie.Title);

        if (movieIS != null) {
            this.setState({
                clickMovie: movieIS,
                redirectReview: true,
            })
        }

    }

    getISDetails(title) {
        var movie_arr = this.state.movie_arr;

        for (let i = 0; i < movie_arr.length; i++) {
            var movieIS = movie_arr[i];
            console.log(movieIS);
            if (movieIS.title != null) {
                if (movieIS.title.toLowerCase() == title.toLowerCase()) {
                    return movieIS;
                }
            }

        }

        return null;
    }

    render() {

        const carouselitem = {
            width: "100%",
            height: 600,
            backgroundColor: "rgb(249, 249, 249)",
        };

        const centralize = {
            margin: "auto",
            width: "100%",
            textAlign: 'center',
            // paddingTop: "20px"
        };

        const font = {
            color: "black",
            paddingTop: "20px",
        }

        const image = {
            // width: 50,
            height: 350
        };

        console.log(this.state);
        if (this.state.redirectReview) {
            return (
                <Redirect push from='/' to={{
                    pathname: '/reviews',
                    state: {
                        selected_movie: this.state.clickMovie,
                    }
                }} />
            )

        }

        if (this.state.movie_arr.length > 0 && this.state.top_rated_movies.length > 5) {
            console.log(this.state.top_rated_movies.length)
            var topRatedArr = this.state.top_rated_movies;
            return (
                <div>
                    <Jumbotron fluid>
                        <Container style={centralize}>
                            <h2 >Top Rated Movies</h2>
                            <br></br>
                            <Row>
                                <Col>

                                    <Link
                                        onClick={() => this.handleClick(topRatedArr[0])}
                                    >
                                        <MDBCardImage
                                            className="img-fluid pb-3"
                                            src={topRatedArr[0].Poster}
                                            style={image}
                                            onClick={() => this.handleClick(topRatedArr[0])}
                                        />

                                    </Link>
                                    <figcaption>
                                        <Link
                                            onClick={() => this.handleClick(topRatedArr[0])}
                                            style={{ color: 'black' }}>
                                            {topRatedArr[0].Title}
                                        </Link>
                                    </figcaption>

                                </Col>

                                <Col>

                                    <Link
                                        onClick={() => this.handleClick(topRatedArr[1])}
                                    >
                                        <MDBCardImage
                                            className="img-fluid pb-3"
                                            src={topRatedArr[1].Poster}
                                            style={image}
                                            onClick={() => this.handleClick(topRatedArr[1])}
                                        />
                                    </Link>
                                    <figcaption>
                                        <Link
                                            onClick={() => this.handleClick(topRatedArr[1])}
                                            style={{ color: 'black' }}>
                                            {topRatedArr[1].Title}
                                        </Link>
                                    </figcaption>
                                </Col>

                                <Col>

                                    <Link
                                        onClick={() => this.handleClick(topRatedArr[2])}
                                    >
                                        <MDBCardImage
                                            className="img-fluid pb-3"
                                            src={topRatedArr[2].Poster}
                                            style={image}
                                            onClick={() => this.handleClick(topRatedArr[2])}
                                        />
                                    </Link>
                                    <figcaption>
                                        <Link
                                            onClick={() => this.handleClick(topRatedArr[2])}
                                            style={{ color: 'black' }}>
                                            {topRatedArr[2].Title}
                                        </Link>
                                    </figcaption>
                                </Col>

                                <Col>

                                    <Link
                                        onClick={() => this.handleClick(topRatedArr[3])}
                                    >
                                        <MDBCardImage
                                            className="img-fluid pb-3"
                                            src={topRatedArr[3].Poster}
                                            style={image}
                                            onClick={() => this.handleClick(topRatedArr[3])}
                                        />
                                    </Link>
                                    <figcaption>
                                        <Link
                                            onClick={() => this.handleClick(topRatedArr[3])}
                                            style={{ color: 'black' }}>
                                            {topRatedArr[3].Title}
                                        </Link>
                                    </figcaption>
                                </Col>

                                <Col>
                                    <Link
                                        onClick={() => this.handleClick(topRatedArr[4])}
                                    >
                                        <MDBCardImage
                                            className="img-fluid pb-3"
                                            src={topRatedArr[4].Poster}
                                            style={image}
                                            onClick={() => this.handleClick(topRatedArr[4])}
                                        />
                                    </Link>
                                    <figcaption>
                                        <Link
                                            onClick={() => this.handleClick(topRatedArr[4])}
                                            style={{ color: 'black' }}>
                                            {topRatedArr[4].Title}
                                        </Link>
                                    </figcaption>
                                </Col>


                            </Row>
                        </Container>
                    </Jumbotron>
                </div>
            )
        }

        return (
            <div></div>

        )

    }

    getData() {
        var xhr = new XMLHttpRequest();
        let urlCinema = "https://api.internationalshowtimes.com/v4/movies/?countries=SG&apikey=" + this.state.apikeyIS;
        xhr.addEventListener('load', () => {
            var resp = JSON.parse(xhr.responseText);
            if(resp.movies){
                this.setState({
                    movie_arr: resp.movies,
                }, () => {
                    this.getTopRatedMovies();
                });
                
            }
           
        })

        xhr.open('GET', urlCinema);
        xhr.send();
    }

    getTopRatedMovies() {
        var movie_arr = this.state.movie_arr;
        var count = 0;

        for (let i = 0; i < movie_arr.length; i++) {
            var movie = movie_arr[i];
            
            // console.log(this.checkIfHighlyRatedByIMDB(movie))
            this.checkIfHighlyRatedByIMDB(movie)

            // if(this.checkIfHighlyRatedByIMDB(movie)){
            //     count +=1;
            //     console.log("hey")
            // }

            // if(count>5){
            //     console.log(count);
            //     break;
            // }

        }

        // this.setState({
        //     top_rated_movies: result,
        // })

        // console.log(result)

    }


    checkIfHighlyRatedByIMDB(movie) {
        var movie_omdb_details = 'hey';
        var movie_id = movie.id;
        var xhr = new XMLHttpRequest();
        let urlmoviedetails = "https://api.internationalshowtimes.com/v4/movies/" + movie_id + "?fields=imdb_id&apikey=" + this.state.apikeyIS;
        var that = this;
        var top_rated_movies = this.state.top_rated_movies;
        var top = false;
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            var resp = JSON.parse(xhr.responseText);
            var imdb_id = resp.movie.imdb_id
            // console.log(imdb_id)

            var xhr2 = new XMLHttpRequest()

            //get movie details from imdb
            let urlMovieDetails = "http://www.omdbapi.com/?i=" + imdb_id + "&apikey=" + this.state.apikeyOMDB;
            xhr2.addEventListener('load', () => {
                var resp = JSON.parse(xhr2.responseText);
                movie_omdb_details = resp;
                // console.log(movie_omdb_details)
                // return movie_omdb_details;
                if (movie_omdb_details.imdbRating) {
                    if (movie_omdb_details.imdbRating >= this.state.toptreshhold) {
                        // that.top = true;
                        top_rated_movies.push(movie_omdb_details);
                        this.setState({
                            top_rated_movies: top_rated_movies,
                        })
                    }
                }



            })
            xhr2.open('GET', urlMovieDetails)
            xhr2.send()

        })
        xhr.open('GET', urlmoviedetails)
        xhr.send()

        // return movie_omdb_details;
        return top;
    }

}

export default RecommendMovies;