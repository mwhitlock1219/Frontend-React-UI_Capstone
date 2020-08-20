import React, { Component } from 'react';

import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import nopic from '../res/nopic.png';

import { API_URL } from './CONSTANTS';

export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: [],
            page: "",
            pagenum: "1",
            totalpages: ""
        };
        this.redirect = this.redirect.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);

    }

    componentDidMount() {
        // will 'fetch'/return api data
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=b644ab6b14fc5346cabffe34357d92a0&language=en-US&page=" + this.state.pagenum)
            .then(response => response.json())
            .then(
                //handle the results
                (data) => {
                    // console.log(data.results);
                    this.setState({
                        titles: data.results,
                        page: data.page,
                        totalpages: data.total_pages
                    });
                }

            );

    }

    fetchApi() {
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=b644ab6b14fc5346cabffe34357d92a0&language=en-US&page=" + this.state.pagenum)
            .then(response => response.json())
            .then(
                //handle the results
                (data) => {
                    // console.log(data.results);
                    this.setState({
                        titles: data.results,
                        page: data.page,
                        totalpages: data.total_pages
                    });
                }

            )
    }

    addMovie(event, id) {
        event.preventDefault();
        console.log(this.props.user.id);
        const y = this.state.titles.find(title => {
            if (title.id === id) {
                return title;
            }
        });

        const token = localStorage.getItem("token")
        console.log(y);
        const package1 = {
            userId: this.props.user.id,
            movieId: id,
            type: "movie"
        }
        // LOCAL CODE
        axios.post("http://localhost:8080/watchlist", package1, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })


        // // HEROKU
        // axios.post("https://backend-springboot-capstone.herokuapp.com/watchlist", package1, { headers: { Authorization: `Bearer ${token}` } })
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    }

    changeBackground(e) {
        e.target.style.background = 'rgb(50 60 70)';
    }
    changeBackgroundBack(e) {
        e.target.style.background = 'rgb(43 50 56)';
    }

    redirect(movie) {
        localStorage.setItem('title', JSON.stringify(movie));
        window.location.href = '/title_details';
    }

    previousPage() {
        if (this.state.page > 1) {
            this.setState({ pagenum: this.state.page - 1 });
            this.fetchApi();
        }
    }

    nextPage() {
        if (this.state.page < this.state.totalpages) {
            this.setState({ pagenum: this.state.page + 1 });
            this.fetchApi();
        }
    }

    render() {
        const { titles } = this.state;

        return (
            <div>
                <Container style={{ marginTop: "40px", marginBottom: "80px" }}>
                    <Row>
                        <Col md={10}>
                            <h3 style={{ color: "rgba(255,255,255,.5)" }}>Popular TV Shows</h3>
                        </Col>
                        <Col md={2}>
                            <Row className="float-right">
                                <a onClick={this.previousPage}><img src="https://img.icons8.com/nolan/32/previous.png" /></a>
                                <h5 style={{ color: "rgba(255,255,255,.5)", marginRight: "10px", marginLeft: "10px" }}>{this.state.page}</h5>
                                <a onClick={this.nextPage}><img src="https://img.icons8.com/nolan/32/next.png" /></a>
                            </Row>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "20px" }}>
                        {titles.map((movie) => (
                            <Card onMouseEnter={this.changeBackground} onMouseLeave={this.changeBackgroundBack} className={"border border-dark text-light"} style={{ width: "272px", marginTop: "-10px", backgroundColor: "rgb(43 50 56)" }} key={movie.id} onClick={() => this.redirect(movie)}>
                                <Card.Img variant="top" src={movie.poster_path === null ? nopic : `https://image.tmdb.org/t/p/w200${movie.poster_path}`} style={{ height: "330px", width: "220px" }} />
                                <Card.Title className={"font-weight-bold"} style={{ color: "rgba(255,255,255,.5)", marginTop: "10px" }}>{movie.title}</Card.Title>
                                <Card.Subtitle className="mb-2" style={{ color: "rgba(255,255,255,.5)" }}>{movie.release_date}</Card.Subtitle>
                                <Row>
                                    <Col><Button variant="outline-light" style={{ float: 'right' }}
                                    ><FontAwesomeIcon icon={faPlusSquare} /></Button></Col>
                                </Row>
                            </Card>
                        ))}

                    </Row>
                </Container>
            </div>
        );
    }
}
