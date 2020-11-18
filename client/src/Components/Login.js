import React from "react";
import { Row, Col, Button, FormGroup, Input, Label, Form } from "reactstrap";
import Auth from "../Auth.js";
const auth = new Auth();
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    auth.login(this.state.email, this.state.password, response => {
      console.log(response);
    });
  }

  render() {
    return (
      <div class="container-fluid">
        <Row>
          <Col md={{ size: 6, offset: 3 }} className="my-5">
            <Form className="text-white" onSubmit={this.handleSubmit}>
              <FormGroup row>
                <Label sm={2}>Email</Label>
                <Col sm={10}>
                  <Input
                    required
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label sm={2}>Password</Label>
                <Col sm={10}>
                  <Input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col md="12">
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
