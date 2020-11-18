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

class AdminShowsCreate extends React.Component {
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
    data.append("imageString", this.state.imageName);
    data.append(
      "imageName",
      document.querySelector('input[type="file"]').files[0],
      this.state.imageName
    );
    fetch(`${process.env.REACT_APP_APIURL}/api/shows/`, {
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
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/admin/shows" />;
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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default AdminShowsCreate;
