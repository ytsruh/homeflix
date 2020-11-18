import React from "react";
import {
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

class MovieRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      redirect: false
    };
    this.toggle = this.toggle.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
  }

  deleteMovie() {
    fetch(`${process.env.REACT_APP_APIURL}/api/movies/${this.state.movie.id}`, {
      method: "DELETE",
      headers: {
        Authorization: "homeflix-admin"
      }
    })
      .then(response => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          this.setState({ redirect: true });
        } else {
          return response.json();
        }
      })
      .then(() => {
        this.setState({ redirect: true });
      })
      .catch(err => {
        console.log("Fetch Error :-S", err);
      });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentWillMount() {
    this.setState({
      movie: this.props.data
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin" />;
    }
    return (
      <tr>
        <th scope="row">{this.state.movie.name}</th>
        <td>{this.state.movie.releaseYear}</td>
        <td>
          <Button
            color="primary"
            className="float-right"
            tag={Link}
            to={`/admin/movies/${this.state.movie.id}`}
          >
            Edit
          </Button>
        </td>
        <td>
          <Button color="light" onClick={this.toggle}>
            Delete
          </Button>
          <Modal
            isOpen={this.state.modal}
            toggle={this.toggle}
            centered
            className="text-white"
            backdropClassName="backdropModal"
            contentClassName="contentModal"
            size="lg"
          >
            <ModalHeader toggle={this.toggle}>
              {this.state.movie.name}
            </ModalHeader>
            <ModalBody>
              <Row className="text-white my-3">
                <Col md="12">
                  Are you sure you want to remove this movie from the library?
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" size="lg" onClick={this.deleteMovie}>
                Delete
              </Button>
              <Button color="light" onClick={this.toggle}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </td>
      </tr>
    );
  }
}

export default MovieRow;
