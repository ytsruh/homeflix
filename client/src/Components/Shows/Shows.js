import React from "react";
import { Container, Row, Col } from "reactstrap";
import Loading from "../LoadingSpinner";
import ShowList from "./ShowList";

class Shows extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    fetch(`${process.env.REACT_APP_APIURL}/api/shows/`)
      .then(response => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          return;
        } else {
          return response.json();
        }
      })
      .then(json => {
        this.setState({
          shows: json.data,
          loading: false
        });
      })
      .catch(err => {
        console.log("Fetch Error :-S", err);
      });
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    } else {
      if (this.state.shows) {
        var shows = this.state.shows.map(show => {
          return <ShowList key={show.id} data={show} />;
        });
      }
      return (
        <Container fluid>
          <Row>
            <Col md={{ size: 10, offset: 1 }}>
              <Row>
                <div className="my-3">
                  <h1 className="text-primary">Shows</h1>
                </div>
              </Row>
              <Row>{shows}</Row>
            </Col>
          </Row>
        </Container>
      );
    }
  }
}

export default Shows;
