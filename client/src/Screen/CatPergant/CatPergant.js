import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import CatPergantFrom from "../../features/CategoryPergent/CatPergantFrom";
import CatPergantList from "../../features/CategoryPergent/CatPergantList";

const CatPergant = () => {
  return (
    <Container fluid className="mt-4 mb-4">
      <Row className="mt-4 mb-4">
        <Col md={4} lg={4} xs={12}>
          <CatPergantFrom />
        </Col>
        <Col md={8} lg={8} xs={12}>
          <CatPergantList />
        </Col>
      </Row>
    </Container>
  );
};

export default CatPergant;
