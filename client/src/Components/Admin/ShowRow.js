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

class ShowRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      redirect: false
    };
    this.toggle = this.toggle.bind(this);
    this.deleteShow = this.deleteShow.bind(this);
  }

  deleteShow() {
    fetch(`${process.env.REACT_APP_APIURL}/api/shows/${this.state.show.id}`, {
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
      show: this.props.data
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin/" />;
    }
    return (
      <tr>
        <th scope="row">{this.state.show.name}</th>
        <td>
          <Button
            color="secondary"
            tag={Link}
            to={`/admin/shows/${this.state.show.id}/addepisode`}
          >
            Add Episode
          </Button>
        </td>
        <td>
          <Button
            color="primary"
            className="pull-right"
            tag={Link}
            to={`/admin/shows/${this.state.show.id}`}
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
              {this.state.show.name}
            </ModalHeader>
            <ModalBody>
              <Row className="text-white my-3">
                <Col md="12">
                  Are you sure you want to remove this show from the library?
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" size="lg" onClick={this.deleteShow}>
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

export default ShowRow;
