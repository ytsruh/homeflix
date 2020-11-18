import React from "react";
import Loading from "../LoadingSpinner";
import { Row, Col, Container, Table, Button } from "reactstrap";
import ShowRow from "./ShowRow";
import Icon from "react-icons-kit";
import { plus } from "react-icons-kit/fa/plus";
import { Link } from "react-router-dom";

class AdminShows extends React.Component {
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
          return <ShowRow key={show.id} data={show} />;
        });
        return (
          <Container fluid>
            <Row>
              <Col md={{ size: 10, offset: 1 }}>
                <Row>
                  <Col md="12" className="my-3">
                    <h1 className="text-primary">Admin: TV Shows</h1>
                  </Col>
                </Row>
                <Row>
                  <Col md="12" className="my-3">
                    <Button
                      color="primary"
                      className="float-right"
                      size="lg"
                      tag={Link}
                      to={"/admin/shows/create"}
                    >
                      <Icon icon={plus} /> Create New TV Show
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Table dark size="sm" responsive className="my-3">
                    <thead>
                      <tr className="font-weight-bold text-uppercase">
                        <th className="w-50">TV Show Title</th>
                        <th className="w-20" />
                        <th className="w-10" />
                        <th className="w-10" />
                      </tr>
                    </thead>
                    <tbody>{shows}</tbody>
                  </Table>
                </Row>
              </Col>
            </Row>
          </Container>
        );
      }
    }
  }
}

export default AdminShows;
