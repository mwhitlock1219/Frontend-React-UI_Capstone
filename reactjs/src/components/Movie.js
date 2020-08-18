import React, { Component } from 'react';

import { Card, Table, Image, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

export default class Movie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titles: []
        };
    }

    componentDidMount() {
        // will 'fetch'/return api data
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=b644ab6b14fc5346cabffe34357d92a0&language=en-US&page=1")
            .then(response => response.json())
            .then(
                //handle the results
                (data) => {
                    // console.log(data.results);
                    this.setState({
                        titles: data.results
                    });
                }

            );

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
            movieId: id
        }
        axios.post("http://localhost:8080/watchlist", package1, { headers: { Authorization: `Bearer ${token}` } })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            })
    }


    render() {

        console.log(this.state);

        const { titles } = this.state;
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header>
                    <FontAwesomeIcon icon={faList} /> Movies
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Actions</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Overview</th>
                                <th>Released Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {titles.map((movie) => (
                                <tr key={movie.id} align="center">
                                    <td>
                                        <Button size="sm" variant="outline-primary" onClick={(event) => { this.addMovie(event, movie.id) }}><FontAwesomeIcon icon={faPlusSquare} /> Add to Watchlist</Button>
                                    </td>
                                    <td >
                                        <Image src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
                                    </td>
                                    <td >{movie.title}</td>
                                    <td >{movie.overview}</td>
                                    <td >{movie.release_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        );
    }
}
