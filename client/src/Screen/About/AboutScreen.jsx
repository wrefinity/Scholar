import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import AboutForm from "../../features/About/AboutForm";
import AboutList from "../../features/About/AboutList";

const AboutScreen = () => {
  return (
    <Container fluid className="mt-4 mb-4">
      <Row className="mt-4 mb-4">
        <Col md={4} lg={4} xs={12}>
          <AboutForm />
        </Col>
        <Col md={8} lg={8} xs={12}>
          <AboutList />
        </Col>
      </Row>
    </Container>
  );
};

export default AboutScreen;
