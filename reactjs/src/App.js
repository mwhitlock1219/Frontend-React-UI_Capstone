import React, { Component } from "react";
import "./App.css";

import { Container, Row, Col } from "react-bootstrap";
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
          <Navbar bg="dark" variant="dark">
            <Link to={""} className="navbar-brand">
              <img
                src="https://img.icons8.com/nolan/2x/movie.png"
                height="40px"
              />
              STREAM
            </Link>
            <div className="navbar-nav mr-auto">
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

              {showModeratorBoard && (
                <li className="nav-item">
                  <Link to={"/mod"} className="nav-link">
                    Moderator Board
                  </Link>
                </li>
              )}

              {showAdminBoard && (
                <li className="nav-item">
                  <Link to={"/admin"} className="nav-link">
                    Admin Board
                  </Link>
                </li>
              )}

              {currentUser && (
                <li className="nav-item">
                  <Link to={"/user"} className="nav-link">
                    Watchlist
                  </Link>
                </li>
              )}

              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/profile"} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/login" className="nav-link" onClick={this.logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                  <div className="navbar-nav ml-auto">
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link">
                        Login
                    </Link>
                    </li>

                    <li className="nav-item">
                      <Link to={"/register"} className="nav-link">
                        Sign Up
                    </Link>
                    </li>
                  </div>
                )}
            </div>
            <Form inline onSubmit={this.handleSubmit}>
              <FormControl
                onChange={this.handleChange}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button type="submit" value="Submit" variant="outline-info">Search</Button>
            </Form>
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