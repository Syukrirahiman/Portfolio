import React from 'react';


import { Table, Jumbotron, Container, Row, Col, Button, Form } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
import { MDBCardImage } from "mdbreact";
import { Redirect } from 'react-router';


class FormPlan extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            cinema: this.props.location.state.cinema,
            movie_id: this.props.location.state.movie_id,
            result: [],
            cinema_id: '',
            city_id: '',
            apikeyIS: 'YOUR_API_KEY_HERE',
            apikeyOMDB: 'YOUR_API_KEY_HERE',
            imdbid: '',
            title: '',
            dateFrom: '',
            dateTo: '',
            redirect: false,
            planid: '',

        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
        this.getData();

    }

    handleChange(event) {

        const target = event.target;
        const name = target.name;
        const value = target.value;


        this.setState({
            [name]: value,
        });

    }

    handleSubmit(event) {
        event.preventDefault();
        var showtimes = this.state.result;
        var dateFrom = this.state.dateFrom;
        var dateTo = this.state.dateTo;
        var cinema = this.state.cinema;
        cinema = cinema.trim().replace(/ /g, '%20');
        var movieTitle = this.state.title;
        movieTitle = movieTitle.trim().replace(/ /g, '%20');

        console.log(cinema);
        console.log(movieTitle);


        var params = "cinema=" + cinema + "&movieTitle=" + movieTitle

        var resultShowtimes = this.generateShowtimes(dateFrom, dateTo, showtimes);

        if (resultShowtimes.length == 0) {
            document.getElementById("error").innerHTML = "There are no showtimes during this period! Please re-enter dates.";
        } else {

            console.log(resultShowtimes)

            for (let i = 0; i < resultShowtimes.length; i++) {
                params += "&showtimes[]=" + encodeURI(resultShowtimes[i]);
            }

            console.log(params);


            var that = this;
            var request = new XMLHttpRequest();

            request.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    console.log("yo")
                    var id = this.responseText;
                    console.log(id);
                    that.setState({
                        redirect: true,
                        planid: id,
                    })
                }
            }
            request.open("GET", "http://localhost/Project/add.php?" + params, true);
            request.send();

        }



    }


    generateShowtimes(dateFrom, dateTo, showtimes) {


        var from = new Date(dateFrom);
        var to = new Date(dateTo);

        var result = []

        // console.log(from)
        // console.log(to)
        // console.log(showtimes)

        for (let i = 0; i < showtimes.length; i++) {
            var showtime = showtimes[i].start_at;
            showtime = new Date(showtime)
            if ((showtime.getDate() <= to.getDate() && showtime.getDate() >= from.getDate())) {
                // console.log("in between: "+showtime)
                result.push(showtimes[i].start_at)
            }

        }

        return result;

    }

    
    getMinDate() {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }

        today = yyyy + '-' + mm + '-' + dd;

        return today;
    }
    redirect() {


        if (this.state.redirect) {
            console.log("ok")
            // window.location.href = "http://localhost:3000/plantomeet?id=" +this.state.planid;
            return (
                <Redirect push from='/' to={{
                    pathname: '/successfulform',
                    state: {
                        planid: this.state.planid,
                    }
                }} />)

        }

    }

    render() {
        const centralize = {
            margin: "auto",
            width: "50%",
            textAlign: 'center',
            paddingTop: "30px"

        };

        console.log(this.state);

        // {this.redirect()}

        if (this.state.redirect) {
            console.log("ok")

            // window.location.href = "localhost:300/plantomeet?id=" +this.state.planid;

            return (<Redirect push from='/' to={{
                pathname: '/successfulform',
                state: {
                    planid: this.state.planid,
                }
            }} />)

        }
        return (

            <Jumbotron fluid style={{ marginTop: "50px" }}>
                <Container>
                    <Form>
                        <h2 style={{ textAlign: 'center', paddingBottom: "20px" }}>Plan Form</h2>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Cinema</Form.Label>
                                <Form.Control value={this.state.cinema} disabled />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Movie</Form.Label>
                                <Form.Control value={this.state.title} disabled />
                            </Form.Group>
                        </Form.Row>
                        {/* <Form.Label>Enter period you're planning to watch</Form.Label> */}
                        <Form.Row>
                            <Form.Group as={Col} controlId="dateFrom">
                                <Form.Label>Period you're planning to watch: From</Form.Label>
                                <Form.Control type="date" placeholder="dd/mm/yyyy" name="dateFrom" min={this.getMinDate()} onChange={this.handleChange} />
                                <span id="error" style={{ color: "red" }}></span>
                            </Form.Group>

                            <Form.Group as={Col} controlId="dateTo">
                                <Form.Label>To</Form.Label>
                                <Form.Control type="date" placeholder="dd/mm/yyyy" min={this.getMinDate()} name="dateTo" onChange={this.handleChange} />
                            </Form.Group>
                        </Form.Row>


                        <div style={centralize}>
                            <Button variant="danger" type="submit" onClick={this.handleSubmit}>
                                Generate Link
                        </Button>
                        </div>
                    </Form>
                </Container>
            </Jumbotron>



        )

    }



    getData() {


        var cinema_name = this.state.cinema;
        var movie_id = this.state.movie_id;

        //incase api is down uncomment below (must choose terminator and amk hub)

        // var data = require('./backupjson/getallcinemas.json');

        // var city_id = this.state.city_id;
        // var data = require('./backupjson/formplanshowtimeterminatoramk.json');
        // var result_arr = [];

        // var cinema_id = "66156";
        

        // for (let i = 0; i < data.showtimes.length; i++) {
        //     var showtime = data.showtimes[i];
        //     // console.log(showtime);
        //     var showtimeDateFormat = new Date(showtime);
        //     var dateNow = Date.now();


        //     if (showtime.cinema_id == cinema_id && showtime.movie_id == movie_id) {
        //         result_arr.push(showtime);
        //     }

        // }

        // console.log(result_arr);

        // this.setState({
        //     result: result_arr,
        // });

        // var data = require('./backupjson/formplanterminatordetails.json');

        // this.setState({
        //     imdbid: data.movie.imdb_id,
        //     title: data.movie.title,

        // });

        //end of json method




        //api method 

        var xhr = new XMLHttpRequest()
        let urlCinemas = "https://api.internationalshowtimes.com/v4/cinemas/?apikey=" + this.state.apikeyIS;
        xhr.addEventListener('load', () => {
            // update the state of the component with the result here
            var resp = JSON.parse(xhr.responseText);
            for (let i = 0; i < resp.cinemas.length; i++) {
                var cinema = resp.cinemas[i];
                if (cinema_name.toLowerCase() == cinema.name.toLowerCase()) {
                    this.setState({
                        cinema_id: cinema.id,
                        city_id: cinema.city_id,
                    });
                }

            }

            console.log(this.state);

            var xhr2 = new XMLHttpRequest()
            var city_id = this.state.city_id;


            console.log(city_id)
            console.log(movie_id)

            //get showtimes
            let urlShowtimes = "https://api.internationalshowtimes.com/v4/showtimes?city_ids=" + city_id + "&movie_id=" + movie_id + "&apikey=" + this.state.apikeyIS;
            xhr2.addEventListener('load', () => {
                // update the state of the component with the result here
                var result_arr = [];
                var resp = JSON.parse(xhr2.responseText);
                console.log(this.state.cinema_id)
                console.log(movie_id)
                for (let i = 0; i < resp.showtimes.length; i++) {
                    var showtime = resp.showtimes[i];
                    // console.log(showtime);
                    var showtimeDateFormat = new Date(showtime);
                    var dateNow = Date.now();


                    if (showtime.cinema_id == this.state.cinema_id && showtime.movie_id == movie_id) {
                        result_arr.push(showtime);
                    }

                }

                console.log(result_arr);

                this.setState({
                    result: result_arr,
                });

            })
            xhr2.open('GET', urlShowtimes)
            xhr2.send()

            console.log(this.state);



        })
        xhr.open('GET', urlCinemas)
        xhr.send()





        // get movie details
        var xhr3 = new XMLHttpRequest();
        let urlmoviedetails = "https://api.internationalshowtimes.com/v4/movies/" + movie_id + "?fields=imdb_id,title,&apikey=" + this.state.apikeyIS;

        xhr3.addEventListener('load', () => {
            // update the state of the component with the result here
            var resp = JSON.parse(xhr3.responseText);
            this.setState({
                imdbid: resp.movie.imdb_id,
                title: resp.movie.title,

            });

            console.log(this.state.imdbid);

            //     var xhr4 = new XMLHttpRequest()

            //     //get movie details from imdb
            //     let urlMovieDetails = "http://www.omdbapi.com/?i=" + this.state.imdbid + "&apikey=" + this.state.apikeyOMDB;
            //     xhr4.addEventListener('load', () => {
            //         // update the state of the component with the result here


            //         var resp = JSON.parse(xhr4.responseText);
            //         this.setState({
            //             movie_details: resp,
            //         });

            //         console.log(this.state);
            //     })
            //     xhr4.open('GET', urlMovieDetails)
            //     xhr4.send()

        })
        xhr3.open('GET', urlmoviedetails)
        xhr3.send()

    }

    displayShowtimes() {

        // this.getData();
        let r = this.state.result;
        var test = '';
        var result = "<table> <tr> <th>S/No</th> <th>Time</th></tr>";
        console.log(r);
        for (let i = 0; i < r.length; i++) {
            result += "<tr><td>" + (i + 1) + "</td><td>" + r[i].start_at + "</td></tr>";
            test += (i + 1) + " " + r[i].start_at + " ";
        }
        result += "</table>";

        // return "<div id  = 'showtime' dangerouslySetInnerHTML={{__html:"+result+'}}></div>'

        return result;

        // this.document.getElementById("showtime").innerHTML = result;
    }
}

export default FormPlan;