import React from "react";
import { Container, Row, Col, Form, FormGroup, Input } from "reactstrap";
import Loading from "../LoadingSpinner";
import MovieList from "./MovieList";

class Movies extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      filter: "",
    };
    this.filterMovies = this.filterMovies.bind(this);
  }

  filterMovies(event) {
    this.setState({
      filter: event.target.value,
    });
  }

  componentWillMount() {
    fetch(`${process.env.REACT_APP_APIURL}/api/movies/`)
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        } else {
          return response.json();
        }
      })
      .then((json) => {
        this.setState({
          movies: json.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      if (this.state.movies) {
        var movies = this.state.movies.map((movie) => {
          return (
            <MovieList key={movie.id} data={movie} filter={this.state.filter} />
          );
        });
      }

      return (
        <Container fluid>
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <Row>
                <div className="my-3">
                  <h1 className="text-primary">Movies</h1>
                </div>
              </Row>
              <Row>
                <Col md="12">
                  <Row>
                    <Col md={{ size: 10, offset: 1 }}>
                      <div className="my-2">
                        <Form>
                          <FormGroup>
                            <Input
                              onChange={this.filterMovies}
                              type="text"
                              placeholder="Search..."
                            />
                          </FormGroup>
                        </Form>
                      </div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="results">{movies}</Row>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default Movies;
