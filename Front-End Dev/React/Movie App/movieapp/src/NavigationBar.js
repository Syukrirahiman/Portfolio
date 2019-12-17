import React from 'react';
import ReactDOM from 'react-dom';
import './NavigationBar.css';
import Navbar from 'react-bootstrap/Navbar';
import { NavDropdown } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { Button } from 'react-bootstrap';


class NavigationBar extends React.Component {
    
    render() {
        return (
            <div className="NavigationBar fixed-top">
                <Navbar bg="dark" expand="lg" variant="dark" >
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={require("./img/popcorn.png")}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />
                        {' Meet-2-Pop '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/nowshowing">Now Showing/Reviews</Nav.Link>
                            <Nav.Link href="/cinemas">Cinemas</Nav.Link>
                            <Nav.Link href="/plan">Plan-2-Meet</Nav.Link>
                            {/* <Nav.Link href="#meet2pop">Meet-2-Pop</Nav.Link> */}
                            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        {/* <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Navbar.Collapse>
                </Navbar>
            </div>
        )
    }

}

export default NavigationBar;