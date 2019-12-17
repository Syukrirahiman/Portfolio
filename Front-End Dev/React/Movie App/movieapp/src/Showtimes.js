import React from 'react';

import './Showtimes.css'

import { Table, Jumbotron, Container, Row, Col, Button } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
import { MDBCardImage } from "mdbreact";


class Showtimes extends React.Component {


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
            movie_details: {},
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.getData();

    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;


        window.alert('We will bring you to ' + this.state.cinema + '\'s website for booking. Thank you for using our service!');
        // window.location.href = value;
        window.open(
            value,
            '_blank'
          );

    }

    printDate(stringDate) {
        var date = new Date(stringDate);
        // console.log((date.getMonth()+1) + '/' + date.getDate() + '/' +  date.getFullYear())

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        stringDate = (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + " Time: " + strTime;

        return stringDate;

    }

    displayDetail() {
        const bold = {
            fontWeight: 'bold',
        };

        const center = {
            textAlign: 'center',
        };

        if (this.state.movie_details.Title) {


            return (

                <Jumbotron fluid>

                    <Container>
                        <Row>
                            <Col>


                                <MDBCardImage
                                    className="img-fluid pb-3 float-left"
                                    src={this.state.movie_details.Poster}
                                />

                            </Col>
                            <Col xs={7}>

                                <h1>{this.state.movie_details.Title}</h1>

                                <p><span style={bold}>Release date:</span>  {this.state.movie_details.Released}  </p>
                                <p> <span style={bold}>IMDB Rating:</span>  {this.state.movie_details.imdbRating} </p>
                                <p> <span style={bold}>Runtime:</span>  {this.state.movie_details.Runtime} </p>
                                <p> <span style={bold}>Rated:</span>  {this.state.movie_details.Rated} </p>
                                <p> <span style={bold}>Genre:</span>  {this.state.movie_details.Genre} </p>
                                <p> <span style={bold}>Director:</span>  {this.state.movie_details.Director} </p>
                                <p> <span style={bold}>Production:</span>  {this.state.movie_details.Production} </p>
                                <p> <span style={bold}>Language:</span>  {this.state.movie_details.Language} </p>

                                <p><span style={bold}>Plot:</span> {this.state.movie_details.Plot}</p>


                            </Col>


                        </Row>
                        <div className="table1">
                            <h3>{this.state.movie_details.Title} showtimes at {this.state.cinema} </h3>
                            <br></br>

                            <Table striped bordered hover variant="dark"  >
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Timeslot</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.result.map((value, index) => (
                                        <tr>
                                            <td>
                                                {index + 1}
                                            </td>
                                            <td colSpan="2">{this.printDate(value.start_at)}</td>
                                            <td style={center}><Button variant="outline-light" value={value.booking_link} onClick={this.handleChange}>Book Now</Button></td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                        </div>


                    </Container>
                </Jumbotron>


            )
        }


    }

    render() {

        return (
            <div id="showtime">

                {this.displayDetail()}

            </div>

        )

    }



    getData() {

        //in case api is down uncomment below (must choose amk hub)

        // var data = require('./backupjson/getallcinemas.json');

        // var city_id = this.state.city_id;
        // var data = require('./backupjson/formplanshowtimeterminatoramk.json');
        // console.log(data);
        // var result_arr = [];
        // var cinema_id = "66156";
        // var movie_id = this.state.movie_id;

        // for (let i = 0; i < data.showtimes.length; i++) {

        //     var showtime = data.showtimes[i];
        //     console.log(showtime)
        //     var start_at = showtime.start_at;
        //     console.log(start_at)
        //     var showtimeDateFormat = new Date(start_at);
        //     var dateNow = Date.now();

        //     if (showtime.cinema_id == cinema_id && showtime.movie_id == movie_id) {
        //         if (showtimeDateFormat >= dateNow){
        //             result_arr.push(showtime);
        //         }
                
        //     }

        // }

        // console.log(result_arr);

        // this.setState({
        //     result: result_arr,
        // });

        // this.setState({
        //     imdbid: "tt6450804",
        // }, ()=>{
        //     var data = require('./backupjson/omdbterminatordetails.json');
        //     this.setState({
        //         movie_details: data,
        //     });
        // });






        //api method



        var xhr = new XMLHttpRequest()
        var cinema_name = this.state.cinema;
        let urlCinemas = "https://api.internationalshowtimes.com/v4/cinemas/?apikey=" + this.state.apikeyIS;
        var movie_id = this.state.movie_id;
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
                    var start_at = showtime.start_at;
                    var showtimeDateFormat = new Date(start_at);
                    var dateNow = Date.now();
        
                    if (showtime.cinema_id == this.state.cinema_id && showtime.movie_id == movie_id) {
                        if (showtimeDateFormat >= dateNow){
                            result_arr.push(showtime);
                        }
                        
                    }
                    // }

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
        let urlmoviedetails = "https://api.internationalshowtimes.com/v4/movies/" + movie_id + "?fields=imdb_id&apikey=" + this.state.apikeyIS;

        xhr3.addEventListener('load', () => {
            // update the state of the component with the result here
            var resp = JSON.parse(xhr3.responseText);
            this.setState({
                imdbid: resp.movie.imdb_id,
            });

            console.log(this.state.imdbid);

            var xhr4 = new XMLHttpRequest()

            //get movie details from imdb
            let urlMovieDetails = "http://www.omdbapi.com/?i=" + this.state.imdbid + "&apikey=" + this.state.apikeyOMDB;
            xhr4.addEventListener('load', () => {
                // update the state of the component with the result here


                var resp = JSON.parse(xhr4.responseText);
                this.setState({
                    movie_details: resp,
                });

                console.log(this.state);
            })
            xhr4.open('GET', urlMovieDetails)
            xhr4.send()

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

export default Showtimes;