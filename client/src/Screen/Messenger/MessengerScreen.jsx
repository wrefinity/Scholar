import React from "react";
import Container from "react-bootstrap/Container";
import { Row, Col } from "react-bootstrap";
import MessengerForm from "../../features/Messenger/MessengerForm";
import Subcribers from "../../features/Messenger/Subcribers";

const MessengerScreen = () => {
  return (
    <Container fluid className="mt-4 mb-4" >
      <Row className="mt-4 mb-4">
        <Col md={6} lg={6} xs={12}>
          <MessengerForm />
        </Col>
        <Col md={6} lg={6} xs={12}>
          <Subcribers />
        </Col>
      </Row>
    </Container>
  );
};

export default MessengerScreen;
