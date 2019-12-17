import React from 'react';

import { Table, Jumbotron, Container, Row, Col, Button, Form } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';


class CinemasNearby extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            apikeyIS: 'YOUR_API_KEY_HERE',
            cinema_arr: [],
            destination_value: null,
            redirect: false,
            curr_lat: '',
            curr_lng: '',
            distanceSet: 1, //in km
        };

        this.handleChange = this.handleChange.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this);

    }

    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            this.setState({
                curr_lat: null,
                curr_lng: null,
            })
        }
        // this.getData();
    }

    showPosition(position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        console.log(lat)
        console.log(lng)

        this.setState({
            curr_lat: lat,
            curr_lng: lng,
        }, () => {
            this.getData();
        })
    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;

        // this.setState({
        //     value : value,
        //     redirect: true,
        //   });

        this.setState({
            distanceSet: value,
        }, () => {
            this.getData();
        });
        // console.log(this.state);
        // console.log(this.state.value.location);

    }

    handleRedirect(event) {

        const target = event.target;
        const value = target.value;


        this.setState({
            destination_value: this.state.cinema_arr[value],
            redirect: true,
        });
    

    }

    

    displayResult(){
        const center = {
            textAlign: 'center',
        };
        if(this.state.cinema_arr != undefined && this.state.cinema_arr.length > 0){
            return(
                <Table striped bordered hover variant="dark"  >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Cinema</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cinema_arr.map((value, index) => (
                            <tr>
                                <td>
                                    {index + 1}
                                </td>
                                <td colSpan="2">{value.name}</td>
                                <td style={center}>
                                    <Button variant="outline-light" value={index} onClick={this.handleRedirect}>Get Direction</Button>

                                </td>

                            </tr>
                        ))}

                    </tbody>
                </Table>
            )
        }
    }

    render() {
        console.log(this.state);
        if (this.state.redirect) {
            console.log(this.state);
            console.log(this.state.destination_value.location);
            return (
                <Redirect push from='/' to={{
                    pathname: '/getdirections',
                    state: {
                        destination_value: this.state.destination_value.location,
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
            width: "50%",
            textAlign: 'center',
            paddingTop: "20px"
        };

        return (

            <div className="table1" style={centralize}>

                <h1 >Cinemas Nearby</h1>


                <Form>
                    <Form.Group controlId="exampleForm.ControlSelect1">
                        <Form.Label>Set Distance Nearby (KM)</Form.Label>
                        <Form.Control as="select" onChange={this.handleChange}>
                            <option>1</option>
                            <option>5</option>
                            <option>8</option>
                            <option>10</option>
                        </Form.Control>
                    </Form.Group>
                </Form>




                <br></br>

                {this.displayResult()}
                
                {/* <Table striped bordered hover variant="dark"  >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Cinema</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.cinema_arr.map((value, index) => (
                            <tr>
                                <td>
                                    {index + 1}
                                </td>
                                <td colSpan="2">{value.name}</td>
                                <td style={center}>
                                    <Button variant="outline-light" value={index} onClick={this.handleChange}>Get Direction</Button>

                                </td>

                            </tr>
                        ))}

                    </tbody>
                </Table> */}
            </div>

        )


    }



    getData() {

        var lat = this.state.curr_lat;
        var lng = this.state.curr_lng;
        var distance = this.state.distanceSet;

        //incase api is down uncomment below

        // var data = require('./backupjson/nearbycinemadist'+this.state.distanceSet+'.json');
        // this.setState({
        //     cinema_arr: data.cinemas,
        // });


        var xhr = new XMLHttpRequest();
        let urlCinema = "https://api.internationalshowtimes.com/v4/cinemas/?location=" + lat + "," + lng + "&distance=" + distance + "&apikey=" + this.state.apikeyIS;
        xhr.addEventListener('load', () => {
            var resp = JSON.parse(xhr.responseText);
            this.setState({
                cinema_arr: resp.cinemas,
            });
        })

        xhr.open('GET', urlCinema);
        xhr.send();


    }


}

export default CinemasNearby;