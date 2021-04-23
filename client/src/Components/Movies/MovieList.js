import React from "react";
import { Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Link } from "react-router-dom";

class MovieList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };
    this.toggle = this.toggle.bind(this);
    this.showOrHide = this.showOrHide.bind(this);
  }

  showOrHide(filter) {
    let x = true;
    let search = new RegExp(filter, "i");
    if (this.state.movie.PartitionKey.search(search) === -1) {
      x = false;
      return x;
    } else {
      return x;
    }
  }

  componentWillMount() {
    this.setState({
      movie: this.props.data,
      showMovie: true,
    });
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.filter !== prevProps.filter) {
      this.setState({
        showMovie: this.showOrHide(this.props.filter),
      });
    }
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  render() {
    let display;
    if (!this.state.showMovie) {
      display = "d-none";
    }
    let imageUrl;
    if (this.state.movie.imageName) {
      imageUrl = `https://homeflix-media.azureedge.net/images/movies/${this.state.movie.imageName}`;
    } else {
      imageUrl = "http://via.placeholder.com/900x1350";
    }
    return (
      <Col md="3" className={display}>
        <div>
          <Button onClick={this.toggle} className="modalButton movieImageContainer">
            <img className="movieImageThumbnail" src={imageUrl} alt={this.state.movie.PartitionKey} />
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
            <ModalHeader toggle={this.toggle}>{this.state.movie.PartitionKey}</ModalHeader>
            <ModalBody>
              <Row className="text-white my-3">
                <Col sm="2">
                  <img className="movieThumbnail" src={imageUrl} alt={this.state.movie.PartitionKey} />
                </Col>
                <Col sm="10">
                  <h6 className="my-2">Duration: {this.state.movie.duration}</h6>
                  <h6 className="my-2">Genre: Comedy</h6>
                  <h6 className="my-2">Year: {this.state.movie.releaseYear}</h6>
                  <p className="my-3">{this.state.movie.description}</p>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                size="lg"
                tag={Link}
                to={{ pathname: "/movies/" + this.state.movie.RowKey, state: this.state }}
              >
                Play
              </Button>
              <Button color="light" onClick={this.toggle}>
                Dismiss
              </Button>
            </ModalFooter>
          </Modal>
        </div>
      </Col>
    );
  }
}

export default MovieList;
