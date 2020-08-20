import React, { Component } from "react";
import { Card, Table, Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import nopic from "../res/nopic.png";
export default class Watchlist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: "",
            titles: [],
            titlescomplete: [],
            watchlist: "",
        };
        this.pullWatchList = this.pullWatchList.bind(this);
    }
    pullWatchList(userId) {
        // event.preventDefault();
        const token = localStorage.getItem("token");
        console.log(token);
        axios
            .get(`http://localhost:8080/user/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    userId: "userId",
                },
            })
            .then((response) => {
                this.setState({
                    watchlist: response.data,
                });
                console.log("this is the response: " + response);
                console.log("this is the watchlist: " + this.state.watchlist);
                this.convertStringToArray();
                this.createCompleteTitles();
            })
            .catch((error) => {
                console.log(error);
                // this.setState({
                //     users: responnse.users
                // });
            });
        // console.log(x.users);
    }
    createCompleteTitles() {
        console.log("The state at creation stage " + this.state.watchlist);
        console.log("The length of titles " + this.state.titles.length);
        for (let i = 0; i < this.state.titles.length; i++) {
            var individualtitle = [];
            const title = this.state.titles;
            individualtitle = title[i].split(",");
            if (individualtitle[1] === "tv") {
                this.callTvApi(individualtitle[0]);
                console.log(individualtitle[0]);
            } else if (individualtitle[1] === "movie") {
                this.callMovieApi(individualtitle[0]);
            }
        }
    }
    componentDidMount() {
        const user = JSON.parse(localStorage.getItem("user"));
        this.pullWatchList(user.id);
        // will 'fetch'/return api data
        // fetch("https://api.themoviedb.org/3/movie/popular?api_key=b644ab6b14fc5346cabffe34357d92a0&language=en-US&page=1")
        //     .then(response => response.json())
        //     .then(
        //         //handle the results
        //         (data) => {
        //             console.log(data.results);
        //             this.setState({
        //                 titles: data.results
        //             });
        //         }
        //     )
    }
    convertStringToArray() {
        var arrayOfIds = [];
        const watchlist = this.state.watchlist;
        console.log("this is the watchlist before split: " + this.state.watchlist);
        arrayOfIds = watchlist.split(" ");
        for (let i = 0; i < arrayOfIds.length; i++) {
            console.log(arrayOfIds[i]);
            console.log("loop " + i);
        }
        this.setState({ titles: arrayOfIds });
    }
    callTvApi(titleid) {
        fetch(
            "https://api.themoviedb.org/3/tv/" +
            titleid +
            "?api_key=b644ab6b14fc5346cabffe34357d92a0&language=en-US"
        )
            .then((response) => response.json())
            .then(
                //handle the results
                (data) => {
                    // console.log(data);
                    this.setState({
                        searchresults: data,
                    });
                    console.log("######Found a TV Show: " + data);
                    this.state.titlescomplete.push(data);
                }
            );
    }
    callMovieApi(titleid) {
        fetch(
            "https://api.themoviedb.org/3/movie/" +
            titleid +
            "?api_key=b644ab6b14fc5346cabffe34357d92a0&language=en-US"
        )
            .then((response) => response.json())
            .then(
                //handle the results
                (data) => {
                    // console.log(data);
                    this.setState({
                        searchresults: data,
                    });
                    console.log("######Found a Movie: " + data);
                    this.state.titlescomplete.push(data);
                }
            );
    }
    redirect(results) {
        localStorage.setItem("title", JSON.stringify(results));
        window.location.href = "/title_details";
    }
    changeBackground(e) {
        e.target.style.background = "rgb(50 60 70)";
    }
    changeBackgroundBack(e) {
        e.target.style.background = "rgb(43 50 56)";
    }
    deleteTitle(event, searchresults) {
        event.preventDefault();
        console.log(this.props.user.id);
        // const y = this.state.searchresults.find(title => {
        //     if (title.id === id) {
        //         return title;
        //     }
        // });
        var type;
        if (searchresults.first_air_date) {
            type = "tv";
        } else if (searchresults.title) {
            type = "movie";
        }
        const token = localStorage.getItem("token");
        // console.log(y);
        const package1 = {
            userId: this.props.user.id,
            movieId: searchresults.id,
            type: type,
        };
        // LOCAL CODE
        axios
            .post("http://localhost:8080/watchlist/delete", package1, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    render() {
        console.log(this.state);
        const searchresults = this.state.titlescomplete;
        return (
            <Container style={{ marginTop: "40px", marginBottom: "80px" }}>
                <Row>
                    <Col md={10}>
                        <h3 style={{ color: "rgba(255,255,255,.5)" }}>Popular TV Shows</h3>
                    </Col>
                    <Col md={2}>
                        <Row className="float-right">
                            <a onClick={this.previousPage}>
                                <img src="https://img.icons8.com/nolan/32/previous.png" />
                            </a>
                            <h5
                                style={{
                                    color: "rgba(255,255,255,.5)",
                                    marginRight: "10px",
                                    marginLeft: "10px",
                                }}
                            >
                                {this.state.page}
                            </h5>
                            <a onClick={this.nextPage}>
                                <img src="https://img.icons8.com/nolan/32/next.png" />
                            </a>
                        </Row>
                    </Col>
                </Row>
                <Row style={{ marginTop: "20px" }}>
                    {searchresults.map((title) => (
                        <Card
                            onMouseEnter={this.changeBackground}
                            onMouseLeave={this.changeBackgroundBack}
                            className={"border border-dark text-light"}
                            style={{
                                width: "272px",
                                marginTop: "-10px",
                                backgroundColor: "rgb(43 50 56)",
                            }}
                            key={title.id}
                        >
                            <Card.Img
                                variant="top"
                                src={
                                    title.poster_path === null
                                        ? nopic
                                        : `https://image.tmdb.org/t/p/w200${title.poster_path}`
                                }
                                style={{ height: "330px", width: "220px" }}
                                onClick={() => this.redirect(title)}
                            />
                            <Card.Title
                                className={"font-weight-bold"}
                                style={{ color: "rgba(255,255,255,.5)", marginTop: "10px" }}
                            >
                                {title.name}
                            </Card.Title>
                            <Card.Subtitle
                                className="mb-2"
                                style={{ color: "rgba(255,255,255,.5)" }}
                            >
                                {title.first_air_date}
                            </Card.Subtitle>
                            <Button
                                size="sm"
                                variant="outline-light"
                                onClick={(event) => {
                                    this.deleteTitle(event, title);
                                }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </Card>
                    ))}
                </Row>
            </Container>
        );
    }
}