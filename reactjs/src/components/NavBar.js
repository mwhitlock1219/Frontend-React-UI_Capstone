import React from 'react';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to={""} className="navbar-brand"><img src="https://img.icons8.com/nolan/2x/movie.png" height="40px" />STREAM</Link>
                <Nav className="mr-auto">
                    <Link to={"addTV"} className="nav-link">TV Shows</Link>
                    <Link to={"addMovie"} className="nav-link"> Movies</Link>
                    <Link to={"list"} className="nav-link">Watchlist</Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
                <Button variant="success">Sign In</Button>
            </Navbar>
        );
    }
}

export default NavBar;