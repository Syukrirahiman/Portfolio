import React from 'react';
import { Table, Jumbotron, Container, Row, Col, Button, Form } from 'react-bootstrap';
import { MDBCardImage } from "mdbreact";
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


class PlanToMeet extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            planid: this.props.location.state.planid,
            result_arr: [],
            name: '',
            participant: '',
            participantExists: false,
            showForm: false,
            cinema: '',
            movie: '',
            showtimeSelect: '',
            showResult: false,
            resultVote: [],
            participants: [],
            apikeyIS: '7UiR6NYdJicQiXms2GOxJSqBddHXuivw',
            movieDetails: '',
            cinemaDetails: '',
            redirectToDirection: false,
            redirectionToReview: false,
            error: false,
            revote: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitVote = this.handleSubmitVote.bind(this);
        this.handleRevote = this.handleRevote.bind(this);
    }

    componentDidMount() {
        this.getDataFromPhp();

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
        console.log("hey");
        var planid = this.state.planid;
        var name = this.state.name;
        var params = "planid=" + planid + "&name=" + name;


        var that = this;
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var participantObj = JSON.parse(this.responseText);
                console.log(participantObj)
                if (participantObj.showtimeVoted != null) { //participant has already voted
                    that.setState({
                        participant: participantObj,
                        participantExists: true,

                    })

                } else {
                    var participantObj = JSON.parse(this.responseText);
                    console.log(participantObj);
                    that.setState({
                        participant: participantObj,
                        showForm: true,
                    })

                }

            }
        }
        request.open("GET", "http://localhost/Project/addparticipant.php?" + params, true);
        request.send();

    }

    handleSubmitVote(event) {
        event.preventDefault();
        console.log("hey2")
        var planid = this.state.planid;
        var name = this.state.name;
        var selectedShowtime = encodeURI(this.state.showtimeSelect);
        console.log(selectedShowtime);
        var params = "planid=" + planid + "&name=" + name + "&selectedShowtime=" + selectedShowtime;


        var that = this;
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var voteObj = JSON.parse(this.responseText);
                console.log(voteObj);
                that.setState({
                    participant: voteObj,
                    revote: false,
                }, () => {
                    that.getParticipants();
                });
            }
        }
        request.open("GET", "http://localhost/Project/submitvote.php?" + params, true);
        request.send();

    }


    handleRevote(event) {
        event.preventDefault();
        this.setState({
            revote: true,
            showtimeSelect: this.state.result_arr[0].showtime,

        })
    }

    getUpdatedResult() {
        var that = this;

        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                console.log(result);
                that.setState({
                    result_arr: result,
                })
            }
        }
        request.open("GET", "http://localhost/Project/retrievebyid.php?planid=" + that.state.planid, true);
        request.send();
    }


    getParticipants() {
        var planid = this.state.planid;
        var params = "planid=" + planid;

        var that = this;
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var participantsObj = JSON.parse(this.responseText);
                console.log(participantsObj);
                that.setState({
                    participants: participantsObj,
                    showResult: true,
                }, () => {
                    that.getUpdatedResult();
                })
            }
        }
        request.open("GET", "http://localhost/Project/retrieveparticipants.php?" + params, true);
        request.send();


    }

    getParticipantsWithoutUpdatingResult() {
        var planid = this.state.planid;
        var params = "planid=" + planid;

        var that = this;
        var request = new XMLHttpRequest();

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var participantsObj = JSON.parse(this.responseText);
                console.log(participantsObj);
                that.setState({
                    participants: participantsObj,
                })
            }
        }
        request.open("GET", "http://localhost/Project/retrieveparticipants.php?" + params, true);
        request.send();

    }

    checkVoter(showtime, participant) {
        if (showtime == participant.showtimeVoted) {
            return (<li>{participant.name}</li>
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

        const centralize = {
            margin: "auto",
            width: "100%",
            // textAlign: 'center',
            paddingTop: "30px"
        };


        return (
            <div>

                <Container style={centralize}>

                    <Row>
                        <Col sm={6}>
                            <h1 >Result for Plan ID: {this.state.planid}</h1>
                            <p >You are logged in as '{this.state.name}'. You have voted for {this.printDate(this.state.participant.showtimeVoted)}
                            .&nbsp; 
                            <a onClick={this.handleRevote} style={{textDecoration:"underline", color:"blue"}}>
                                Click here to revote
                            </a>
                            </p>
            
                            {this.displayMovieCinemaDetails()}
                            <p style={bold}>Votes Result:</p>
                            <ol>
                                {this.state.participants.map((value, index) => (
                                    <li>{this.displayShowtimeVote(value)}</li>
                                    //    <p>{value.name} has voted for {this.printDate(value.showtimeVoted)} </p> 
                                ))}
                            </ol>


                        </Col>
                        <Col sm={6} style={{ marginTop: "50px", textAlign: "center" }}>
                            <h3>Showtime Result</h3>
                            <br></br>
                            <Table striped bordered hover variant="dark"  >
                                <thead>
                                    <tr>
                                        <th>S/No</th>
                                        <th>Showtime</th>
                                        <th>Voter(s)</th>
                                        <th style={center}>No. of vote(s)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.result_arr.map((value, index) => (

                                        <tr>
                                            <td>{index + 1}</td>
                                            <td >{this.printDate(value.showtime)}</td>
                                            <td>

                                                <ul style={{ padding: "0", listStyleType: "none" }}>

                                                    {this.state.participants.map((value2, index2) => (
                                                        <span id={index2}>{this.checkVoter(value.showtime, value2)}</span>
                                                    ))}

                                                </ul>

                                            </td>
                                            <td style={center}>{value.counter}</td>

                                        </tr>
                                    ))}
                                </tbody>

                            </Table>

                        </Col>


                    </Row>


                    <br></br>

                </Container>

            </div>
        );


    }

    displayMovieCinemaDetails() {
        const bold = {
            fontWeight: 'bold',
        };

        const centralize = {
            margin: "auto",
            width: "95%",
            // textAlign: 'center',
            paddingTop: "-80px",
        };
        var movieDetails = this.state.movieDetails;
        var cinemaDetails = this.state.cinemaDetails;

        return (
            <Jumbotron fluid>
                <Container style={centralize}>


                    <Row>
                        <Col sm={4}>
                            <MDBCardImage
                                className="img-fluid pb-3"
                                // src={movieDetails.poster_image_thumbnail}
                                src={this.state.moviePoster}
                            />
                        </Col>
                        <Col sm={8}>
                            <p><span style={bold}>Movie Title </span></p>
                            <p>{this.state.movie}</p>
                            <p><span style={bold}>Cinema </span></p>
                            <p>{this.state.cinema}</p>
                            {this.displayTimeslotResult()}

                        </Col>


                    </Row>
                    <br></br>

                    <Row style={centralize}>
                        <Col>
                            <Link to={{
                                pathname: "/reviews",
                                state: {
                                    selected_movie: this.state.movieDetails,
                                }
                            }} >
                                <button type="button" className="btn btn-danger">View Review</button>
                            </Link>

                        </Col>

                        <Col>

                            <Link to={{
                                pathname: "/getdirections",
                                state: {
                                    destination_value: this.state.cinemaDetails.location,
                                }
                            }} >
                                <button type="button" className="btn btn-danger">Get Direction</button>
                            </Link>

                        </Col>


                    </Row>


                </Container>


            </Jumbotron>

        )


    }

    displayTimeslotResult() {

        const bold = {
            fontWeight: 'bold',
        };

        var timeslotResults = this.state.result_arr;
        var highestCount = timeslotResults[0].counter;
        var result = new Array(timeslotResults[0]);
        for (let i = 1; i < timeslotResults.length; i++) {
            if (timeslotResults[i].counter == highestCount) {
                result.push(timeslotResults[i]);
            } else if (timeslotResults[i].counter > highestCount) {
                highestCount = timeslotResults[i].counter;
                result = new Array(timeslotResults[i]);
            }
        }

        console.log(result);

        if (result.length > 1) {
            return (
                <div>
                    <p style={bold}>Highest timeslots voted are: </p>
                    <ul>
                        {result.map((value, index) => (
                            <li>{this.printDate(value.showtime)}</li>
                            //    <p>{value.name} has voted for {this.printDate(value.showtimeVoted)} </p> 
                        ))}
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <p><span style={bold}>Highest timeslot voted is:</span> </p>
                    <p>{this.printDate(result[0].showtime)}</p>
                </div>
            )
        }
    }

    displayShowtimeVote(participant) {

        return participant.name + " has voted for " + this.printDate(participant.showtimeVoted);
    }

    displayForm() {
        const bold = {
            fontWeight: 'bold',
        };

        const center = {
            textAlign: 'center',
        };

        const centralize = {
            margin: "auto",
            width: "50%",
            textAlign: 'center',
            paddingTop: "30px"
        };
        return (
            <div>

                <Container>
                    <p>Logged in as: {this.state.name}</p>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Cinema</Form.Label>
                                <Form.Control value={this.state.result_arr[0].cinema} disabled />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Movie</Form.Label>
                                <Form.Control value={this.state.result_arr[0].movie} disabled />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Select Showtime</Form.Label>
                                <Form.Control as="select" name="showtimeSelect" onChange={this.handleChange}>

                                    {this.state.result_arr.map((value, index) => (

                                        <option value={value.showtime}>{this.printDate(value.showtime)}</option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>


                        <div style={centralize}>

                            <Button variant="danger" type="submit" name="vote" onClick={this.handleSubmitVote}>
                                Submit Vote
                        </Button>
                        </div>

                    </Form>
                </Container>

            </div>
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
        stringDate = "Date: " + (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ", Time: " + strTime;

        return stringDate;

    }

    getTotalCounts() {

        var result_arr = this.state.result_arr;

        var totalCount = parseInt(result_arr[0].counter);
        console.log(totalCount)

        for (let i = 1; i < result_arr.length; i++) {
            totalCount += parseInt(result_arr[i].counter);
            console.log(totalCount)
        }
        console.log(totalCount)

        return totalCount;

    }





    render() {
        console.log(this.state);
        console.log(this.state.result_arr.length);

        if (this.state.error) {
            window.alert('Please enter a valid Plan ID!');



            return (
                <div>
                    <Redirect push from='/' to={{
                        pathname: '/plan',
                    }} />
                </div>
            )
        }

        if (this.state.revote) {
            return (
                <div>
                    {this.displayForm()}
                </div>
            )

        }

        if (this.state.showResult || this.state.participantExists) {
            return (
                <div>
                    {this.displayResult()}
                </div>
            )
        }

        if (this.state.showForm) {
            return (
                <div>
                    {this.displayForm()}
                </div>
            )
        }

        if (this.state.result_arr.length > 0) {

            const centralize = {
                margin: "auto",
                width: "80%",
                // textAlign: 'center',
                marginTop: "50px"
            };

            return (


                <Jumbotron fluid style={centralize}>

                    <Container>

                        <h2>Vote for {this.state.result_arr[0].movie}'s showtimes at {this.state.result_arr[0].cinema}</h2>
                        {/* <p>Share Plan ID: {this.state.planid} with your friends to let them vote as well!</p> */}



                        <Form>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Enter Name to vote</Form.Label>
                                    <Form.Control name="name" type="text" onChange={this.handleChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">

                                </Form.Group>

                            </Form.Row>
                            <Button variant="danger" type="submit" name="name" onClick={this.handleSubmit}>
                                Submit
                        </Button>

                        </Form>

                    </Container>
                </Jumbotron>

            )
        }

        return (
            <div></div>

        )

    }


    getDataFromPhp() {
        var that = this;

        var request = new XMLHttpRequest();

        console.log(this.state.planid)

        request.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var result = JSON.parse(this.responseText);
                console.log(result);
                if (result.length == 0) {
                    that.setState({
                        error: true,
                    })

                } else {

                    that.setState({
                        result_arr: result,
                        showtimeSelect: result[0].showtime,
                        movie: result[0].movie,
                        cinema: result[0].cinema,
                    }, () => {
                        that.getMovieDetails();
                        that.getCinemaDetails();
                        that.getParticipantsWithoutUpdatingResult();
                    });

                }

            }
        }
        request.open("GET", "http://localhost/Project/retrievebyid.php?planid=" + that.state.planid, true);
        request.send();

    }


    getCinemaDetails() {

        //in case api is down, uncomment below. use json

        // var data = require('./backupjson/getallcinemas.json');

        // var cinema_Arr = data.cinemas;
        // for (let i = 0; i < cinema_Arr.length; i++) {
        //     for (let i = 0; i < cinema_Arr.length; i++) {
        //         // console.log(cinema_Arr[i].name)
        //         if (this.state.cinema.toLowerCase() == cinema_Arr[i].name.toLowerCase()) {
        //             this.setState({
        //                 cinemaDetails: cinema_Arr[i],
        //             });
        //         }
        //     }

        // }


        //api method

        var xhr = new XMLHttpRequest();
        let urlCinema = "https://api.internationalshowtimes.com/v4/cinemas/?countries=SG&apikey=" + this.state.apikeyIS;
        xhr.addEventListener('load', () => {
            var resp = JSON.parse(xhr.responseText);
            var cinema_Arr = resp.cinemas;
            // console.log(cinema_Arr)
            for (let i = 0; i < cinema_Arr.length; i++) {
                // console.log(cinema_Arr[i].name)
                if (this.state.cinema.toLowerCase() == cinema_Arr[i].name.toLowerCase()) {
                    this.setState({
                        cinemaDetails: cinema_Arr[i],
                    });
                }
            }

        })

        xhr.open('GET', urlCinema);
        xhr.send();
    }

    getMovieDetails() {

        //in case api is down uncomment below

        // var data = require('./backupjson/getallmoviesinternationalshowtime.json');
        // var movie_Arr = data.movies;
        // for (let i = 0; i < movie_Arr.length; i++) {
        //     if (this.state.movie == movie_Arr[i].title) {
        //         this.setState({
        //             movieDetails: movie_Arr[i],
        //             moviePoster: movie_Arr[i].poster_image_thumbnail
        //         }, () => {
        //             this.checkPosterNull();
        //         });
        //     }
        // }




        //api method

        var xhr = new XMLHttpRequest();
        let urlCinema = " https://api.internationalshowtimes.com/v4/movies/?countries=SG&apikey=" + this.state.apikeyIS;
        xhr.addEventListener('load', () => {
            var resp = JSON.parse(xhr.responseText);
            var movie_Arr = resp.movies;
            for (let i = 0; i < movie_Arr.length; i++) {
                if (this.state.movie == movie_Arr[i].title) {
                    this.setState({
                        movieDetails: movie_Arr[i],
                        moviePoster: movie_Arr[i].poster_image_thumbnail
                    }, () => {
                        this.checkPosterNull();
                    });
                }
            }

        })

        xhr.open('GET', urlCinema);
        xhr.send();

    }

    checkPosterNull() {


        if (this.state.moviePoster == null) {

            this.setState({
                moviePoster: require("./img/defaultmovieposter.jpg"),
            })

        }

    }


}

export default PlanToMeet;