import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
import Icon from "react-icons-kit";
import { videoCamera } from "react-icons-kit/fa/videoCamera";
import { desktop } from "react-icons-kit/fa/desktop";

class Dashboard extends React.Component {
  render() {
    return (
      <Container>
        <Row className="my-5">
          <Col sm="6" className="text-white text-center">
            <Col sm="12" className="dashboardIcon">
              <Icon icon={videoCamera} size="100%" className="text-secondary" />
            </Col>
            <Col sm="12">
              <Button color="primary" size="lg" tag={Link} to="/movies/">
                Movies
              </Button>
            </Col>
          </Col>
          <Col sm="6" className="text-white text-center">
            <Col sm="12" className="dashboardIcon">
              <Icon icon={desktop} size="100%" className="text-secondary" />
            </Col>
            <Col sm="12">
              <Button color="primary" size="lg" tag={Link} to="/shows/">
                TV Shows
              </Button>
            </Col>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
