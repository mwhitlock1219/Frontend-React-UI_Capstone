import React, { Component } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

export default class Watchlist extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            titles: []
        };
    }


    pullWatchList(event, userId) {
        event.preventDefault();

        const token = localStorage.getItem("token")
        console.log(token);

        console.log(typeof userId);

        axios.get(`http://localhost:8080/user/${userId}`, { headers: { 
            'Authorization': `Bearer ${token}`,
            'userId' : 'userId'
         } })
            .then(response => {
                console.log(response);
            })
            .catch(
                error => {
                    console.log(error);
                    // this.setState({
                    //     users: responnse.users
                    // });
                }
            )
        // console.log(x.users);
    }

    componentDidMount() {
        // will 'fetch'/return api data
        fetch("https://api.themoviedb.org/3/movie/popular?api_key=b644ab6b14fc5346cabffe34357d92a0&language=en-US&page=1")
            .then(response => response.json())
            .then(
                //handle the results
                (data) => {
                    console.log(data.results);
                    this.setState({
                        titles: data.results
                    });
                }
            )
    }

    render() {
        console.log(this.state);
        const { titles } = this.state;

        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> Watchlist</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Overview</th>
                            </tr>
                        </thead>
                        <tbody>
                            <Button size="sm" variant="outline-primary" onClick={(event) => { this.pullWatchList(event, this.props.user.id) }}><FontAwesomeIcon icon={faPlusSquare} /></Button>
                            {/* {titles.map((movie) => (
                                <tr key={movie.id} align="center">
                                    <td >
                                        <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} />
                                    </td>
                                    <td >
                                        <div>{movie.title}</div>
                                    </td>
                                    <td >
                                        <div>{movie.overview}</div>
                                    </td>

                                </tr>
                            ))} */}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

        );
    }
}