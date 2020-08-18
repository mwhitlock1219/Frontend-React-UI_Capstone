import React, { Component } from 'react';

import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare, faBacon } from '@fortawesome/free-solid-svg-icons'

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchresults: [],
            titleid: '',
        };
        this.redirect = this.redirect.bind(this);
    }

    componentDidMount() {
        let search = '';
        if (localStorage && localStorage.getItem('sq')) {
            search = JSON.parse(localStorage.getItem('sq'));
        }
        // will 'fetch'/return api data
        fetch("https://api.themoviedb.org/3/search/multi?api_key=b644ab6b14fc5346cabffe34357d92a0&query=" + search + "&page=1")
            .then(response => response.json())
            .then(
                //handle the results
                (data) => {
                    console.log(data.results);
                    this.setState({
                        searchresults: data.results
                    });
                }

            )

    }


    redirect(results) {
        console.log("this is JSON: " + results.id);
        this.setState({ titleid: results.id });
        console.log("This is state: " + this.state.titleid);
        localStorage.setItem('titleid', JSON.stringify(results.id));
        window.location.href = '/title_details';
        let testtitleid = '';
        if (localStorage && localStorage.getItem('titleid')) {
            testtitleid = JSON.parse(localStorage.getItem('titleid'));
        }
        console.log(testtitleid);
    }



    render() {
        const { searchresults } = this.state;
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> Search Results</Card.Header>
                <Card.Body>
                    <Table striped bordered hover variant="dark">
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
                                <tr key={results.id} align="center" onClick={() => this.redirect(results)}>
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
                    </Table>
                </Card.Body>
            </Card>

        );

    }


}