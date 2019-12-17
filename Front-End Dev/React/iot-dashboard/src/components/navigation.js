import React from 'react';
import ReactDOM from 'react-dom';
import './navigation.css';
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
                        {' Dashboard '}
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/analytics">Analytics</Nav.Link>
                            <Nav.Link href="/systemmonitoring">System Monitoring</Nav.Link>
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