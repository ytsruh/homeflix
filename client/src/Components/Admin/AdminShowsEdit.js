import React from "react";
import {
  Row,
  Col,
  Container,
  Button,
  FormGroup,
  Input,
  Label,
  Form,
  FormText,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import Loading from "../LoadingSpinner";
import TVShowEpisodes from "./TVShowEpisodes";

class AdminShowsEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
      loading: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  componentWillMount() {
    fetch(
      `${process.env.REACT_APP_APIURL}/api/shows/${this.props.match.params.id}`
    )
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
          name: json.data.name,
          imageName: json.data.imageName,
          episodes: json.episodes,
          loading: false,
        });
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
      });
  }

  handleFile(event) {
    this.setState({ imageName: event.target.files[0].name });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = new FormData();
    data.append("name", this.state.name);
    if (document.querySelector('input[type="file"]').files[0]) {
      data.append(
        "imageName",
        document.querySelector('input[type="file"]').files[0],
        this.state.imageName
      );
    } else {
      data.append("imageName", this.state.imageName);
    }
    fetch(
      `${process.env.REACT_APP_APIURL}/api/shows/${this.props.match.params.id}`,
      {
        method: "PUT",
        body: data,
        headers: {
          Authorization: "homeflix-admin",
        },
      }
    )
      .then((response) => {
        if (response.status !== 200) {
          console.log(
            "Looks like there was a problem. Status Code: " + response.status
          );
          this.setState({ redirect: true });
        } else {
          return response.json();
        }
      })
      .then((json) => {
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
      });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin/shows" />;
    } else if (this.state.loading) {
      return <Loading />;
    }
    let imageUrl;
    if (this.state.imageName) {
      imageUrl = `https://homeflix-media.azureedge.net/images/shows/${this.state.imageName}`;
    } else {
      imageUrl = "http://via.placeholder.com/1350x900";
    }
    return (
      <Container fluid>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <Row>
              <Col md="12" className="my-3">
                <h1 className="text-primary">Admin: Edit {this.state.name}</h1>
              </Col>
            </Row>
            <Row>
              <Col md="6" className="my-3">
                <img
                  className="movieThumbnail"
                  src={imageUrl}
                  alt={this.state.name}
                />
              </Col>
              <Col md="6" className="my-3">
                <Form className="text-white" onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Label sm={2}>Name</Label>
                    <Col sm={10}>
                      <Input
                        required
                        disabled
                        type="text"
                        name="name"
                        defaultValue={this.state.name}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Image</Label>
                    <Col sm={10}>
                      <Input
                        type="file"
                        name="imageName"
                        onChange={this.handleFile}
                      />
                      <FormText color="muted">
                        Ensure that file dimensions are minimum 1350*900
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col md="12">
                      <Button color="primary">Submit</Button>
                      <Button
                        color="secondary"
                        tag={Link}
                        className="mx-1"
                        to={`/admin/shows/${this.props.match.params.id}/addepisode`}
                      >
                        Add Episode
                      </Button>
                      <Button
                        color="light"
                        className="float-right"
                        tag={Link}
                        to={"/admin/shows"}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col md="12" className="py-5">
                <TVShowEpisodes data={this.state.episodes} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminShowsEdit;
