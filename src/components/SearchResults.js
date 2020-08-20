import React, { Component } from 'react';
import nopic from '../res/nopic.png';

import { Card, Table, ButtonGroup, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

export default class SearchResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchresults: [],
            titleid: '',
        };
        this.redirect = this.redirect.bind(this);
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
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
        localStorage.setItem('title', JSON.stringify(results));
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
        const { searchresults } = this.state;
        return (
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
                    {searchresults.map((title) => (
                        <Card onMouseEnter={this.changeBackground} onMouseLeave={this.changeBackgroundBack} className={"border border-dark text-light"} style={{ width: "272px", marginTop: "-10px", backgroundColor: "rgb(43 50 56)" }} key={title.id} onClick={() => this.redirect(title)}>
                            <Card.Img variant="top" src={title.poster_path === null ? nopic : `https://image.tmdb.org/t/p/w200${title.poster_path}`} style={{ height: "330px", width: "220px" }} />
                            <Card.Title className={"font-weight-bold"} style={{ color: "rgba(255,255,255,.5)", marginTop: "10px" }}>{title.name}</Card.Title>
                            <Card.Subtitle className="mb-2" style={{ color: "rgba(255,255,255,.5)" }}>{title.first_air_date}</Card.Subtitle>
                        </Card>
                    ))}

                </Row>
            </Container>

        );

    }


}