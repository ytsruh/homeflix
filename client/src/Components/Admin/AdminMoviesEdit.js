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

class AdminMoviesEdit extends React.Component {
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
      `${process.env.REACT_APP_APIURL}/api/movies/${this.props.match.params.id}`
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
          description: json.data.description,
          duration: json.data.duration,
          releaseYear: json.data.releaseYear,
          fileName: json.data.fileName,
          imageName: json.data.imageName,
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
    data.append("description", this.state.description);
    data.append("releaseYear", this.state.releaseYear);
    data.append("fileName", this.state.fileName);
    data.append("duration", this.state.duration);
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
      `${process.env.REACT_APP_APIURL}/api/movies/${this.props.match.params.id}`,
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
      return <Redirect to="/admin/movies" />;
    } else if (this.state.loading) {
      return <Loading />;
    }
    let imageUrl;
    if (this.state.imageName) {
      imageUrl = `https://homeflix-media.azureedge.net/images/movies/${this.state.imageName}`;
    } else {
      imageUrl = "http://via.placeholder.com/900x1350";
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
              <Col md="3" className="my-3">
                <img
                  className="movieThumbnail"
                  src={imageUrl}
                  alt={this.state.name}
                />
              </Col>
              <Col md="9" className="my-3">
                <Form className="text-white" onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Label sm={2}>Name</Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="name"
                        defaultValue={this.state.name}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Release Year</Label>
                    <Col sm={10}>
                      <Input
                        type="number"
                        name="releaseYear"
                        defaultValue={this.state.releaseYear}
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Duration</Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="duration"
                        defaultValue={this.state.duration}
                        onChange={this.handleChange}
                      />
                      <FormText color="muted">
                        Format should be '1h 31min'
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Description</Label>
                    <Col sm={10}>
                      <Input
                        type="textarea"
                        name="description"
                        defaultValue={this.state.description}
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
                        Ensure that file dimensions are minimum 900*1350
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>File Name</Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="fileName"
                        defaultValue={this.state.fileName}
                        onChange={this.handleChange}
                      />
                      <FormText color="muted">
                        This MUST match the filename found in AWS including the
                        extension
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup check row>
                    <Col md="12">
                      <Button color="primary">Submit</Button>
                      <Button
                        color="light"
                        className="float-right"
                        tag={Link}
                        to={"/admin/movies"}
                      >
                        Cancel
                      </Button>
                    </Col>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminMoviesEdit;
