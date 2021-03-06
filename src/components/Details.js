import React, { Component } from 'react';

import tmdb_logo from '../res/tmdb_logo.png';

import { Card, Table, ButtonGroup, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare, faBacon } from '@fortawesome/free-solid-svg-icons'

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchresults: '',
            movie: false,
            tvshow: false,
            person: false,
        };

    }

    componentDidMount() {
        let title = '';
        let titleid = '';
        if (localStorage && localStorage.getItem('title')) {
            title = JSON.parse(localStorage.getItem('title'));
            titleid = title.id;
        }

        if (title.first_air_date) {
            this.setState({ tvshow: true });
            this.callTvApi(title.id);
        } else if (title.title) {
            this.setState({ movie: true });
            this.callMovieApi(title.id);
        } else if (title.gender) {
            this.setState({ person: true });
            this.callPersonApi(title.id);
        }
    }

    callTvApi(titleid) {
        fetch("https://api.themoviedb.org/3/tv/" + titleid + "?api_key=b644ab6b14fc5346cabffe34357d92a0&language=en-US")
            .then(response => response.json())
            .then(
                //handle the results
                (data) => {
                    // console.log(data);
                    this.setState({
                        searchresults: data
                    });
                    console.log("######Found a TV Show: " + data);
                }

            )
    }

    callMovieApi(titleid) {
        fetch("https://api.themoviedb.org/3/movie/" + titleid + "?api_key=b644ab6b14fc5346cabffe34357d92a0&language=en-US")
            .then(response => response.json())
            .then(
                //handle the results
                (data) => {
                    // console.log(data);
                    this.setState({
                        searchresults: data
                    });
                    console.log("######Found a Movie: " + data);
                }

            )
    }

    callPersonApi(titleid) {
        fetch("https://api.themoviedb.org/3/person/" + titleid + "?api_key=b644ab6b14fc5346cabffe34357d92a0&language=en-US")
            .then(response => response.json())
            .then(
                //handle the results
                (data) => {
                    // console.log(data);
                    this.setState({
                        searchresults: data
                    });
                    console.log("######Found a Person: " + data);
                }

            )
    }


    render() {
        console.log(this.state.searchresults);
        const details = this.state.searchresults;
        return (
            <Container style={{ marginTop: "40px", marginBottom: "80px" }} >
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header className="font-weight-bold" style={{ fontSize: "30px" }}> {this.state.movie ? details.title : details.name}</Card.Header>
                    <Card.Body>
                        <Container>
                            <Row>
                                <Col md={4}>
                                    <Card.Img variant="top" src={this.state.person ? `https://image.tmdb.org/t/p/w200${details.profile_path}` : `https://image.tmdb.org/t/p/w200${details.poster_path}`} />
                                </Col>
                                <Col md={1}></Col>
                                <Col md={7}>
                                    <br />
                                    <p className="font-weight-bold">Average Rating:</p>
                                    <p> <img src="https://cdn-images-1.medium.com/max/1200/1*vIR7iO-1GnY2xYxL6NiYkw.png" style={{ height: "20px", width: "20px" }} />{details.vote_average}</p>
                                    <br />
                                    <p className="font-weight-bold">Synopsis:</p>
                                    <p>{details.overview}</p>
                                    <br />
                                    <Row>
                                        <Col>
                                            <Button size="sm" variant="outline-light contained" style={{ float: 'right' }}><FontAwesomeIcon icon={faPlusSquare} /> Add to WatchList</Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Container>
                        {/* <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Add Watchlist</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Overview</th>
                                <th>Release date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchresults.map((results) => (
                                <tr key={results.id} align="center">
                                    <td>
                                        <ButtonGroup>
                                            <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faPlusSquare} /></Button>{" "}
                                            <Button size="sm" variant="outline-danger"><FontAwesomeIcon icon={faBacon} /></Button>
                                        </ButtonGroup>
                                    </td>
                                    <td >
                                        <img src={`https://image.tmdb.org/t/p/w200${results.poster_path}`} alt="title image" />
                                    </td>
                                    <td >{results.media_type === "movie" ? results.title : results.name}</td>
                                    <td >{results.overview}</td>
                                    <td >{results.media_type === "movie" ? results.release_date : results.first_air_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table> */}
                    </Card.Body>
                </Card>
            </Container>
        );

    }


}