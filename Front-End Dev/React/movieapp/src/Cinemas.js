import React from 'react';

import { Table, Jumbotron, Container, Row, Col, Button } from 'react-bootstrap';
// import Button from '@material-ui/core/Button';
import { Redirect } from 'react-router';


class Cinemas extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            apikeyIS: 'YOUR_API_KEY_HERE',
            cinema_arr: [],
            destination_value: null,
            redirect: false,
        };

        this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
        this.getData();

    }

    handleChange(event) {

        const target = event.target;
        const value = target.value;


        this.setState({
            destination_value: this.state.cinema_arr[value],
            redirect: true,
        });
    

    }

    render() {

        if (this.state.redirect) {
            console.log(this.state);
            console.log(this.state.destination_value.location);
            return( 
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


        return (

            <div className="table1">
                <Table striped bordered hover variant="dark">
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
                </Table>
            </div>

        )


    }



    getData() {


        //incase get all get all cinemas IS is down uncomment below

        // var data = require('./backupjson/getallcinemas.json');
        // this.setState({
        //     cinema_arr: data.cinemas,
        // });
 


        var xhr = new XMLHttpRequest();
        let urlCinema = "https://api.internationalshowtimes.com/v4/cinemas/?countries=SG&apikey=" + this.state.apikeyIS;
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

export default Cinemas;