import React from 'react';

import { Table, Jumbotron, Container, Row, Col, Button, Pagination } from 'react-bootstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


class NowShowing extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            apikeyIS: 'YOUR_API_KEY_HERE',
            movie_arr: [],
            selected_movie: '',
            redirect: false,
            counter: 0,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.getData();

    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;
        console.log(value)
        const movie = this.state.movie_arr[value]

        this.setState({
            selected_movie: movie,
            redirect: false,
        });

    }

    handleClick(index) {
        console.log(index);
        const movie = this.state.movie_arr[index];
        console.log(this.state.movie_arr)
        console.log(movie)

        this.setState({
            selected_movie: movie,
            redirect: true,
        });


    }

    displayMovie() {
        var movie_arr = this.state.movie_arr;


        let row = [],
            col = [];

        for (let i = 0; i < movie_arr.length; i++) {
            var movie = movie_arr[i];
            col.push(<Col>
                <Link
                    onClick={() => this.handleClick(i)}
                    style={{ color: 'black' }}>
                    <img style={{ width: "184px", height: "261px" }} src={movie.poster_image_thumbnail} />
                </Link>
                <figcaption>
                    <Link
                        onClick={() => this.handleClick(i)}
                        style={{ color: 'black' }}>
                        {movie.title}
                    </Link>
                </figcaption>
            </Col>)
            if ((i + 1) % 5 == 0) {
                row.push(<Row style={{ marginTop: "50px" }}>
                    {col}
                </Row>
                )
                col = []
            }
        }

        return row;

    }


    render() {
        if (this.state.redirect) {
            console.log(this.state);
            console.log(this.state.selected_movie);
            return (
                <Redirect push from='/' to={{
                    pathname: '/reviews',
                    state: {
                        selected_movie: this.state.selected_movie,
                    }
                }} />
            )

        }

        const bold = {
            fontWeight: 'bold',
        };

        const center = {
            textAlign: 'center',
        };
        const centralize = {
            margin: "auto",
            width: "100%",
            textAlign: 'center',
            marginTop: "50px",
            marginBottom: "50px"
        };


        if (this.state.movie_arr.length > 0) {

            return (
                <Container style={centralize}>
                    <h1>Now Showing</h1>
                    {this.displayMovie()}
                </Container>
            )
        }
        return (

            <div className="table1">
            </div>

        )

    }



    getData() {

        //in case api is down uncomment below

        // var data = require('./backupjson/getallmoviesinternationalshowtime.json');

        // this.setState({
        //     movie_arr: data.movies,
        // }, () => {
        //     this.checkTitleNull()
        // });



        //api method

        var xhr = new XMLHttpRequest();
        let urlCinema = "https://api.internationalshowtimes.com/v4/movies/?countries=SG&apikey=" + this.state.apikeyIS;
        xhr.addEventListener('load', () => {
            var resp = JSON.parse(xhr.responseText);
            this.setState({
                movie_arr: resp.movies,
            }, () => {
                this.checkTitleNull()
            });
        })

        xhr.open('GET', urlCinema);
        xhr.send();


    }

    checkTitleNull() {
        var movie_arr = this.state.movie_arr;
        var result = new Array();
        for (let i = 0; i < movie_arr.length; i++) {
            var movie = movie_arr[i];
            if (movie.title != null) {
                if (movie.poster_image_thumbnail == null) {
                    movie.poster_image_thumbnail = require("./img/defaultmovieposter.jpg")
                }
                result.push(movie)
            }
        }

        this.setState({
            movie_arr: result,
        })
    }


}

export default NowShowing;