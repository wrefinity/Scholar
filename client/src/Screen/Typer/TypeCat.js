import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import TypeForm from "../../features/Types/TypeForm";
import TyleList from "../../features/Types/TyleList";

const TypeCat = () => {
  return (
    <Container fluid className="mt-4 mb-4 mbt">
      <Row className="mt-4 mb-4">
        <Col md={4} lg={4} xs={12}>
          <TypeForm />
        </Col>
        <Col md={8} lg={8} xs={12}>
          <TyleList />
        </Col>
      </Row>
    </Container>
  );
};

export default TypeCat;
