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
  FormText
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";

class AdminMoviesCreate extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
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
    data.append("imageString", this.state.imageName);
    data.append("duration", this.state.duration);
    data.append(
      "imageName",
      document.querySelector('input[type="file"]').files[0],
      this.state.imageName
    );
    fetch(`${process.env.REACT_APP_APIURL}/api/movies/`, {
      method: "POST",
      body: data,
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
      .then(json => {
        this.setState({ redirect: true });
      })
      .catch(err => {
        console.log("Fetch Error :-S", err);
      });
  }

  handleChange(event) {
    if (!event.target.fileName) {
      this.setState({ [event.target.name]: event.target.value });
    } else if (event.target.fileName) {
      this.setState({ fileName: event.target.fileName.files[0] });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin/movies" />;
    }
    return (
      <Container fluid>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <Row>
              <Col md="12" className="my-3">
                <h1 className="text-primary">Admin: Create Movie</h1>
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 8, offset: 2 }} className="my-3">
                <Form className="text-white" onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Label sm={2}>Name</Label>
                    <Col sm={10}>
                      <Input
                        required
                        type="text"
                        name="name"
                        placeholder="Name"
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
                        placeholder="Release Year"
                        onChange={this.handleChange}
                      />
                      <FormText color="muted">
                        Must contain only numbers
                      </FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Duration</Label>
                    <Col sm={10}>
                      <Input
                        type="text"
                        name="duration"
                        placeholder="Duration"
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
                        required
                        type="textarea"
                        name="description"
                        placeholder="Description"
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
                        required
                        type="text"
                        name="fileName"
                        placeholder="File name"
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

export default AdminMoviesCreate;
