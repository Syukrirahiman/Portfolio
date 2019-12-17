import React from 'react';


import {Jumbotron, Container, Row} from 'react-bootstrap';
import { Link } from 'react-router-dom';


class SuccessfulForm extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            planid: this.props.location.state.planid,
            cinema: this.props.location.state.cinema,
            movie: this.props.location.state.movie,
            copyIdToClipboard: false,
        };
        this.handleSubmitClipboard = this.handleSubmitClipboard.bind(this);
    }

    componentDidMount() {

    }


    handleSubmitClipboard(event) {
        event.preventDefault();
        this.setState({
            copyIdToClipboard: true,
        })
    }

    copyIdToClipboard(text) {
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        window.alert('Plan ID: ' + this.state.planid + ' has been successfully copied into your clipboard! Share with your friends now!');

    }

    render() {
        const centralize = {
            margin: "auto",
            width: "50%",
            textAlign: 'center',
            paddingTop: "20px"
        };
        
        const bold = {
            fontWeight: "bold",
        };

        const center ={
            textAlign: 'center',
            margin: "auto",
            marginBottom: "10px",
        }

        console.log(this.state);

   
        if (this.state.copyIdToClipboard) {
            this.copyIdToClipboard(this.state.planid);
        }

        return (


            <Jumbotron fluid style={{marginTop: "50px"}}>
                <Container style ={centralize}>
                    <Row>
                    <img
                            alt=""
                            src={require("./img/successful.png")}
                            width="85"
                            height="85"
                            style={center}
                        />
                    </Row>
                    <Row >
                   
                        <h2 style ={center}>Form Plan ID: <span style={bold}>{this.state.planid} </span> has successfully created! </h2>
                        
                    </Row>
                    <Row><p style ={center}>Copy Plan ID: <span style={bold}>{this.state.planid} </span>to share it with your friends!</p></Row>


                    <Row style ={centralize}>
                       

                            <button style = {center} type="button" className="btn btn-danger" onClick={this.handleSubmitClipboard}>Copy Plan ID to Clipboard</button>
                            <br></br>
                           

                    </Row> 
                    <Row>
                    <Link to={{
                                pathname: "/plantomeet",
                                state: {
                                    planid: this.state.planid,
                                }
                                
                            }} style = {center}>
                                <button  type="button" className="btn btn-danger">Vote now</button>

                            </Link>
                    </Row>
  

                </Container>
            </Jumbotron>



        )

    }

}

export default SuccessfulForm;