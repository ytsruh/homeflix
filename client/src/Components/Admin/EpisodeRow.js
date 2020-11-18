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
import { Redirect } from "react-router-dom";

class EpisodeRow extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
    this.toggle = this.toggle.bind(this);
    this.deleteEpisode = this.deleteEpisode.bind(this);
  }

  componentWillMount() {
    this.setState({
      episode: this.props.data
    });
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }
  deleteEpisode() {
    fetch(
      `${process.env.REACT_APP_APIURL}/api/episodes/${this.state.episode.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "homeflix-admin"
        }
      }
    )
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

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin/shows" />;
    }
    return (
      <tr className="font-weight-bold ">
        <td>{this.state.episode.season}</td>
        <td>{this.state.episode.number}</td>
        <td>{this.state.episode.title}</td>
        <td>{this.state.episode.description}</td>
        <td>
          <Button color="danger" onClick={this.toggle}>
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
              {this.state.episode.title}
            </ModalHeader>
            <ModalBody>
              <Row className="text-white my-3">
                <Col md="12">
                  Are you sure you want to remove this episode from the library?
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" size="lg" onClick={this.deleteEpisode}>
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

export default EpisodeRow;
