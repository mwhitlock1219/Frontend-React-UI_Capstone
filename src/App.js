import React, { Component } from "react";
import "./App.css";

import { Container, Row, Col, NavDropdown, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";

import AuthService from "./services/auth.service";

import Welcome from "./components/Welcome";
import Movie from "./components/Movie";
import TVShow from "./components/TVShow";
import Watchlist from "./components/Watchlist";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
import Details from "./components/Details";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      searchquery: '',
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  redirect() {
    window.location.href = '/search_results';
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ searchquery: event.target.value });
    console.log(this.state.searchquery);
  }

  handleSubmit(event) {
    event.preventDefault();
    localStorage.setItem('sq', JSON.stringify(this.state.searchquery));
    this.redirect();
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
  }

  logOut() {
    AuthService.logout();
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <Router>
        <div>

          <Navbar bg="dark" variant="dark" expand="lg">
            <Link to={""} className="navbar-brand">
              <img
                src="https://img.icons8.com/nolan/2x/movie.png"
                height="40px"
              />
              STREAM
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <li className="nav-item">
                  <Link to={"addTV"} className="nav-link">
                    TV Shows
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"addMovie"} className="nav-link">
                    {" "}
                    Movies
                  </Link>
                </li>
                {currentUser && (
                  <li className="nav-item">
                    <Link to={"/user"} className="nav-link">
                      Watchlist
                    </Link>
                  </li>
                )}
              </Nav>
              <NavDropdown title={<img className="thumbnail-image" src="https://img.icons8.com/nolan/48/user-male-circle.png" alt="Account pic" />} id="basic-nav-dropdown">
                {showModeratorBoard && (
                  <NavDropdown.Item href={"/mod"}>Moderator Board</NavDropdown.Item>
                )}
                {showAdminBoard && (
                  <NavDropdown.Item href={"/admin"}>Admin Board</NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                {currentUser ? (
                  <div >
                    <NavDropdown.Item href={"/profile"}>{currentUser.username}</NavDropdown.Item>
                    <NavDropdown.Item href={"/login"} onClick={this.logOut}>Log Out</NavDropdown.Item>
                  </div>
                ) : (
                    <div>
                      <NavDropdown.Item href={"/login"}>Login</NavDropdown.Item>
                      <NavDropdown.Item href={"/register"}>Sign Up</NavDropdown.Item>
                    </div>
                  )}
              </NavDropdown>
              <Form inline onSubmit={this.handleSubmit}>
                <FormControl
                  onChange={this.handleChange}
                  type="text"
                  placeholder="Search..."
                  className="mr-sm-2"
                />
                <Button type="submit" value="Submit" variant="outline-info">Search</Button>
              </Form>
            </Navbar.Collapse>
          </Navbar>

          <br />
          <Container>
            <Row>
              <Col>
                <Switch>
                  <Route exact path={["/", "/home"]} component={Welcome} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/profile" component={Profile} />
                  <Route path="/user" exact render={() => <Watchlist user={this.state.currentUser} />} />
                  <Route path="/mod" component={BoardModerator} />
                  <Route path="/admin" component={BoardAdmin} />
                  <Route path="/addTV" exact render={() => <TVShow user={this.state.currentUser}
                  />} />
                  <Route path="/addMovie" exact render={() => <Movie user={this.state.currentUser} />} />
                  <Route path="/title_details" exact component={Details} />
                  <Route path="/search_results" exact component={SearchResults} />
                </Switch>
              </Col>
            </Row>
          </Container>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;