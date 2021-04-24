import React from "react";
import { Row, Col, Button, FormGroup, Input, Label, Form } from "reactstrap";
import { Redirect } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loading: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    fetch(`${process.env.REACT_APP_APIURL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }), // body data type must match "Content-Type" header
    })
      .then((response) => {
        if (response.status !== 200) {
          console.log("Looks like there was a problem. Status Code: " + response.status);
          return;
        } else {
          return response.json();
        }
      })
      .then((json) => {
        //Set token
        sessionStorage.setItem("token", JSON.stringify(json));
        //Set redirect
        this.setState({ redirect: true });
      })
      .catch((err) => {
        console.log("Fetch Error :-S", err);
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.loading) {
      return <LoadingSpinner />;
    }
    return (
      <div className="container-fluid">
        <Row>
          <Col lg={{ size: 6, offset: 3 }} className="mt-5">
            <Form className="text-white" onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label lg={2}>Username</Label>
                <Col lg={10}>
                  <Input
                    required
                    type="username"
                    name="username"
                    className="bg-dark border border-primary text-white"
                    placeholder="Username"
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label lg={2}>Password</Label>
                <Col lg={10}>
                  <Input
                    required
                    type="password"
                    name="password"
                    className="bg-dark border border-primary text-white"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col>
                  <Button color="primary" size="lg" block>
                    Submit
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Login;
