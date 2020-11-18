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

class AddEpisode extends React.Component {
  constructor() {
    super();
    this.state = {
      redirect: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setState({
      showId: this.props.match.params.id,
    });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("season", this.state.season);
    data.append("number", this.state.number);
    data.append("description", this.state.description);
    data.append("fileName", this.state.fileName);
    data.append("ShowId", this.state.showId);
    fetch(`${process.env.REACT_APP_APIURL}/api/episodes/`, {
      method: "POST",
      body: data,
      headers: {
        Authorization: "homeflix-admin",
      },
    })
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

  render() {
    if (this.state.redirect) {
      return <Redirect to={"/admin/shows/" + this.state.showId} />;
    }
    return (
      <Container fluid>
        <Row>
          <Col md={{ size: 10, offset: 1 }}>
            <Row>
              <Col md="12" className="my-3">
                <h1 className="text-primary">Admin: Add Episode</h1>
              </Col>
            </Row>
            <Row>
              <Col md={{ size: 8, offset: 2 }} className="my-3">
                <Form className="text-white" onSubmit={this.handleSubmit}>
                  <FormGroup row>
                    <Label sm={2}>Title</Label>
                    <Col sm={10}>
                      <Input
                        required
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={this.handleChange}
                      />
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Season</Label>
                    <Col sm={10}>
                      <Input
                        required
                        type="number"
                        name="season"
                        placeholder="Season Number"
                        onChange={this.handleChange}
                      />
                      <FormText color="muted">This should be a number</FormText>
                    </Col>
                  </FormGroup>
                  <FormGroup row>
                    <Label sm={2}>Episode Number</Label>
                    <Col sm={10}>
                      <Input
                        required
                        type="number"
                        name="number"
                        placeholder="Episode Number"
                        onChange={this.handleChange}
                      />
                      <FormText color="muted">This should be a number</FormText>
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
                        This MUST match the filename found in Azure including
                        the extension
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

export default AddEpisode;
