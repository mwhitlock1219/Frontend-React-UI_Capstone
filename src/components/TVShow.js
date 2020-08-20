import React, { Component } from 'react';

import { Card, Row, Col, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

import { API_URL } from './CONSTANTS';

export default class TVShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: []
        };
    }


    componentDidMount() {
        // will 'fetch'/return api data
        fetch("https://api.themoviedb.org/3/tv/popular?api_key=b644ab6b14fc5346cabffe34357d92a0&language=en-US&page=1")
            .then(response => response.json())
            .then(
                //handle the results
                (data) => {
                    // console.log(data.results);
                    this.setState({
                        titles: data.results
                    });
                }

            )

    }

    addShow(event, id) {
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
            type: "tv"
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
        // axios.post(`${API_URL}/watchlist`, package1, { headers: { Authorization: `Bearer ${token}` } })
        //     .then(response => {
        //         console.log(response);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     })
    }

    render() {

        const { titles } = this.state;
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> TV Shows</Card.Header>
                <Card.Body>
                    {titles.map((tv) => (
                        <Card className={"border border-dark bg-secondary text-white"} key={tv.id} >
                            <Container>
                                <Row>
                                    <Col md={4}>
                                        <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w200${tv.poster_path}`} style={{ height: "330px", width: "220px" }} />
                                    </Col>
                                    <Col md={8}>
                                        <Card.Body>
                                            <Card.Title className={"font-weight-bold"}>{tv.name}</Card.Title>
                                            <Card.Subtitle className="mb-2 text-white">{tv.first_air_date}</Card.Subtitle>
                                            <Card.Text>{tv.overview}</Card.Text>
                                            <Button size="sm" variant="outline-light" onClick={(event) => { this.addShow(event, tv.id) }}><FontAwesomeIcon icon={faPlusSquare} /></Button>
                                        </Card.Body>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    ))}
                </Card.Body >
            </Card >

        );
    }
}